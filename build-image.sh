# Functions
function close_docker()
{
  echo "...... Closing docker ......"
  kill -9 `ps -ef |grep dockerd|grep "\/" |awk '{ print $1}'`
  exit $1
}



echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m----------- Set variables ----------------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"

echo "$CA_FILE" > /etc/ssl/certs/ca.pem
echo "$LOCAL_CRT" > /etc/ssl/certs/localhost.crt
echo "$LOCAL_KEY" > /etc/ssl/certs/localhost.key
apk --update --no-cache add docker
export DOCKER_TLS_VERIFY=""
mkdir -p ~/.docker
echo "$DOCKER_AUTH" > ~/.docker/config.json
/usr/local/bin/dockerd --tlscert /etc/ssl/certs/localhost.crt --tlskey /etc/ssl/certs/localhost.key &
sleep 10

echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m-------- Start build - Show Prop ---------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"

echo Project Name - $CI_PROJECT_NAME
export CI_VERSION=`grep -i -m1 version package.json | awk '{split($0,a,":"); print a[2];}' | tr -d \"\,[:blank:]`
echo Version - $CI_VERSION
echo Profile $APP_PROFILE

echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m--------- Building Docker ----------------------------------------------------------\e[0m"
echo -e "\e[93m\e[1m------------------------------------------------------------------------------------\e[0m"

docker login $DOCKER_REPOSITORY_URL -u $DOCKER_REPOSITORY_USER -p $DOCKER_REPOSITORY_PASSWORD
if [ $? -ne 0 ]
then
  echo -e "\e[91m\e[1m************** Unnable to login on Docker\e[0m"
  close_docker 1
fi
docker build -t docker-images.sao.hamburgsud.com/${CI_PROJECT_NAME}:${CI_VERSION}-${APP_PROFILE} .
if [ $? -ne 0 ]
then
  echo -e "\e[91m\e[1m**************  Unnable to perform Docker Build   ***********************\e[0m"
   close_docker 1
fi
docker push docker-images.sao.hamburgsud.com/$CI_PROJECT_NAME:$CI_VERSION-$APP_PROFILE
if [ $? -ne 0 ]
then
  echo "\e[91m\e[1m************** Unnable to perform Docker Push  ***********************\e[0m";
  close_docker 1
fi
echo "End of process"
close_docker 0

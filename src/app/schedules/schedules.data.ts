export interface Trade {
  name: string;
  schedules: FileDownloadInfo[];
}

export interface FileDownloadInfo {
  name: string;
  downloadLink: string;
}

export const SCHEDULES: Trade[] = [
  {
    name: 'ABAC',
    schedules: [
      {
        name: 'CONOSUR',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/CONOSUR'
      }
    ]
  },
  {
    name: 'ALCT',
    schedules: [
      {
        name: 'ALCT-1',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%201'
      },
      {
        name: 'ALCT-2',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%202'
      },
      {
        name: 'ALCT-3',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%203'
      },
      {
        name: 'ALCT-4',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%204'
      },
      {
        name: 'ALCT-5',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%205'
      },
      {
        name: 'ALCT-6',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ALCT%206'
      },
    ]
  },
  {
    name: 'ASIA',
    schedules: [
      {
        name: 'ASAS1',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ASAS1'
      },
      {
        name: 'ASAS2',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ASAS2'
      }
    ]
  },
  {
    name: 'BULK',
    schedules: [
      {
        name: 'Aliança',
        downloadLink: 'http://10.121.194.127/Schedules/files/bulk/bulk_al.doc'
      }
    ]
  },
  {
    name: 'ECNA',
    schedules: [
      {
        name: 'TANGO',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/TANGO'
      }
    ]
  },
  {
    name: 'GULF',
    schedules: [
      {
        name: 'UCLA',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/UCLA'
      },
      {
        name: 'GS1',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/GS1'
      },
      {
        name: 'BRAZEX',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/BRAZEX'
      }
    ]
  },
  {
    name: 'SAEC',
    schedules: [
      {
        name: 'RIVER PLATE EXPRESS',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/RIVER%20PLATE%20EXPRESS'
      },
      {
        name: 'ECX',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ECX'
      },
      {
        name: 'BOSSA NOVA',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/BOSSA%20NOVA'
      }
    ]
  },
  {
    name: 'ALBB',
    schedules: [
      {
        name: 'ASCA',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ASCA'
      }
    ]
  },
  {
    name: 'APAT',
    schedules: [
      {
        name: 'PATAGONIA',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/PATAGONIA'
      },
      {
        name: 'SAEX',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/SAEX'
      }
    ]
  },
  {
    name: 'SAAF',
    schedules: [
      {
        name: 'SAAF',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/SAAF'
      }
    ]
  },
  {
    name: 'ASCA',
    schedules: [
      {
        name: 'ASCA',
        downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/coastal/report/ASCA'
      }
    ]
  },
];

export const DAILYPOSITIONS: FileDownloadInfo[] = [
  {
    name: 'Ceará',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRFOR'
  },
  {
    name: 'Itajaí',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRITJ'
  },
  {
    name: 'Manaus',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRMAO'
  },
  {
    name: 'Paranaguá',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRPNG'
  },
  {
    name: 'Pernambuco',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRREC'
  },
  {
    name: 'Rio de Janeiro',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRRIO'
  },
  {
    name: 'Rio Grande',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRRIG'
  },
  {
    name: 'Salvador',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRSSA'
  },
  {
    name: 'Santos',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRSSZ'
  },
  {
    name: 'Vila do Conde',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRVLC'
  },
];

export const DAILYPOSITIONSplate: FileDownloadInfo[] = [
  {
    name: 'AR',
    downloadLink: 'https://www.hamburgsud-line.com/liner/media/hamburg_sud_liner_shipping/country_information/rse_1/argentina/daily_positions___cut_offs/HSUD_SCHEDULES.xlsx'
  },
  {
    name: 'UR',
    downloadLink: 'https://www.hamburgsud-line.com/liner/media/hamburg_sud_liner_shipping/country_information/rse_1/uruguay/daily_positions___cut_offs_1/dailypositionuruguay.xlsx'
  },
  {
    name: 'PY',
    downloadLink: 'https://www.hamburgsud-line.com/liner/pt/liner_services/country_information/paraguay/index.html'
  }
];

export const DAILYPOSITIONScorporate: FileDownloadInfo[] = [
  {
    name: 'AR',
    downloadLink: 'https://www.hamburgsud-line.com/liner/media/hamburg_sud_liner_shipping/country_information/rse_1/argentina/daily_positions___cut_offs/HSUD_SCHEDULES.xlsx'
  },
  {
    name: 'UR',
    downloadLink: 'https://www.hamburgsud-line.com/liner/media/hamburg_sud_liner_shipping/country_information/rse_1/uruguay/daily_positions___cut_offs_1/dailypositionuruguay.xlsx'
  }, {
    name: 'PY',
    downloadLink: 'https://www.hamburgsud-line.com/liner/pt/liner_services/country_information/paraguay/index.html'
  },
  {
    name: 'Ceará',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRFOR'
  },
  {
    name: 'Itajaí',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRITJ'
  },
  {
    name: 'Manaus',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRMAO'
  },
  {
    name: 'Paranaguá',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRPNG'
  },
  {
    name: 'Pernambuco',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRREC'
  },
  {
    name: 'Rio de Janeiro',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRRIO'
  },
  {
    name: 'Rio Grande',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRRIG'
  },
  {
    name: 'Salvador',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRSSA'
  },
  {
    name: 'Santos',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRSSZ'
  },
  {
    name: 'Vila do Conde',
    downloadLink: 'https://paappprd004.sao.hamburgsud.com:8443/ScheduleReports/daily/position/BRVLC'
  },
];

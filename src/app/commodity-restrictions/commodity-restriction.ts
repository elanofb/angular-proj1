export class CommodityRestriction {
  id:           number;
  columbusCode: string;
  commodity:    string;
  remarks:      string;
  _links:       ApiLinks;
}

export class Commodity {
  commodity:        string;
  shortDescription: string;
  columbusCode:     string;
  _links:           ApiLinks;
}

export class ApiLinks {
  self:   ApiLink;
}

export class ApiLink {
  href: string;
}

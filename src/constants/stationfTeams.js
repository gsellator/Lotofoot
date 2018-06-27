const teams = [
  {
    name: 'Station F Team',
    url: '@stationf.co',
  },
  {
    name: 'ADN_ x IFM',
    url: '@adn-ifm.stationf.co',
  },
  {
    name: 'Arts et Métiers Acceleration',
    url: '@ama.stationf.co',
  },
  {
    name: 'ShareIT by ASHOKA',
    url: '@ashoka.stationf.co',
  },
  {
    name: 'BNP Paribas',
    url: '@bnp-plugandplay.stationf.co',
  },
  {
    name: 'Chain Accelerator',
    url: '@chainaccelerator.stationf.co',
  },
  {
    name: 'Moove lab',
    url: '@cnpa.stationf.co',
  },
  {
    name: 'Edhec Business School',
    url: '@edhec.stationf.co',
  },
  {
    name: 'Facebook',
    url: '@facebook.stationf.co',
  },
  {
    name: 'Fellowship Program',
    url: '@fellowship.stationf.co',
  },
  {
    name: 'Founders Program',
    url: '@founders.stationf.co',
  },
  {
    name: 'Havas Group',
    url: '@havas.stationf.co',
  },
  {
    name: 'HEC Paris',
    url: '@hec.stationf.co',
  },
  {
    name: 'iPEPS-ICM',
    url: '@icm.stationf.co',
  },
  {
    name: 'Impulse Partners',
    url: '@impulse-partners.stationf.co',
  },
  {
    name: 'Vente-privee',
    url: '@impulse-venteprivee.stationf.co',
  },
  {
    name: 'INSEAD LaunchPad',
    url: '@insead.stationf.co',
  },
  {
    name: 'La Poste',
    url: '@laposte.fr',
  },
  {
    name: 'L\'Oréal',
    url: '@loreal.stationf.co',
  },
  {
    name: 'LVMH',
    url: '@lvmh.stationf.co',
  },
  {
    name: 'Microsoft',
    url: '@microsoft.stationf.co',
  },
  {
    name: 'Naver / Line',
    url: '@naver.stationf.co',
  },
  {
    name: 'Numa',
    url: '@numa.stationf.co',
  },
  {
    name: 'Offices',
    url: '@offices.stationf.co',
  },
  {
    name: 'Omn',
    url: '@omn.stationf.co',
  },
  {
    name: 'OuiCrea',
    url: '@ouicrea.stationf.co',
  },
  {
    name: 'Ponts alliance',
    url: '@ponts-alliance.stationf.co',
  },
  {
    name: 'Schoolab',
    url: '@schoolab.stationf.co',
  },
  {
    name: 'Shakeup Factory',
    url: '@shakeupfactory.stationf.co',
  },
  {
    name: 'MEDIA LAB TF1',
    url: '@tf1.stationf.co',
  },
  {
    name: 'Thales Digital Factory',
    url: '@thales.stationf.co',
  },
  {
    name: 'Ubisoft',
    url: '@ubisoft.stationf.co',
  },
  {
    name: 'Usine.io',
    url: '@usineio.stationf.co',
  },
  {
    name: 'VC',
    url: '@vc.stationf.co',
  },
  {
    name: 'Zendesk',
    url: '@zendesk.stationf.co',
  },
];

export default {
  teams,

  teamsRef: () => {
    let ref = {'@startupflow.io': 'Founders Program'};
    for (let item of teams){
      ref[item.url] = item.name;
    }
    return ref;
  }
};
export const navigation = [
  {
    label: 'Produkte',
    href: '/produkte',
    children: [
      {
        group: 'Nach Waermequelle',
        items: [
          { label: 'AERO Luft-Waermepumpen', href: '/produkte/luft-waermepumpen', desc: 'Energie aus der Aussenluft' },
          { label: 'TERRA Erdwaermepumpen', href: '/produkte/erdwaermepumpen', desc: 'Konstante Waerme der Erde' },
          { label: 'iPUMP Kompaktsysteme', href: '/produkte/ipump', desc: 'Alles in einem Geraet' },
        ],
      },
      {
        group: 'Gross & Steuerung',
        items: [
          { label: 'MAX Gross-Waermepumpen', href: '/produkte/grosswaermepumpen', desc: 'Bis zu 1.500 kW' },
          { label: 'NAVIGATOR Steuerung', href: '/produkte/navigator', desc: 'Intelligentes Energiemanagement' },
          { label: 'HYGIENIK Speicher', href: '/produkte/speicher', desc: 'Frischwasser-Technologie' },
        ],
      },
    ],
  },
  {
    label: 'Loesungen',
    href: '/loesungen',
    children: [
      {
        group: 'Nach Projekt',
        items: [
          { label: 'Neubau', href: '/loesungen/neubau', desc: 'Von Anfang an richtig heizen' },
          { label: 'Sanierung', href: '/loesungen/sanierung', desc: 'Raus aus fossiler Energie' },
          { label: 'Gewerbe & Industrie', href: '/loesungen/gewerbe', desc: 'Grosse Leistung, smarte Steuerung' },
        ],
      },
    ],
  },
  {
    label: 'Referenzen',
    href: '/referenzen',
  },
  {
    label: 'Service',
    href: '/service',
    children: [
      {
        group: 'Support',
        items: [
          { label: 'After Sales', href: '/service/after-sales', desc: 'Technischer Support & Ersatzteile' },
          { label: 'Downloads', href: '/service/downloads', desc: 'Datenblaetter & Anleitungen' },
          { label: 'FAQ', href: '/service/faq', desc: 'Haeufige Fragen' },
          { label: 'Schulungen', href: '/service/schulungen', desc: 'Fuer Fachpartner' },
        ],
      },
    ],
  },
  {
    label: 'Unternehmen',
    href: '/unternehmen',
    children: [
      {
        group: 'Ueber iDM',
        items: [
          { label: 'Ueber uns', href: '/unternehmen/ueber-uns', desc: 'Die Energie-Familie aus Tirol' },
          { label: 'Karriere', href: '/unternehmen/karriere', desc: 'Gestalten Sie die Zukunft mit' },
          { label: 'Innovation', href: '/unternehmen/innovation', desc: 'Technologie, die vorausdenkt' },
          { label: 'Nachhaltigkeit', href: '/unternehmen/nachhaltigkeit', desc: 'Fuer eine saubere Zukunft' },
        ],
      },
    ],
  },
  {
    label: 'Aktuelles',
    href: '/aktuelles',
  },
]

export const ctaButtons = {
  primary: { label: 'Jetzt konfigurieren', href: '/tools/konfigurator' },
  secondary: { label: 'Partner finden', href: '/tools/partnerfinder' },
}

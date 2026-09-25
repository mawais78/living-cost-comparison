export type CostCategory = "housing" | "groceries" | "dining" | "transport" | "utilities" | "healthcare" | "personal" | "leisure"

export type CityCost = {
  slug: string
  city: string
  region?: string
  country: string
  currency: string
  currencySymbol: string
  updated: string
  costs: Record<CostCategory, number>
}

export const costCategories: { key: CostCategory; label: string; description: string }[] = [
  { key: "housing", label: "Housing", description: "Home size, tenure and neighborhood" },
  { key: "groceries", label: "Groceries", description: "Household size, diet and routine" },
  { key: "dining", label: "Dining out", description: "Meal frequency and local restaurant prices" },
  { key: "transport", label: "Transport", description: "Transit access, commute and car use" },
  { key: "utilities", label: "Utilities & connectivity", description: "Energy, water, internet and mobile service" },
  { key: "healthcare", label: "Healthcare", description: "Routine care, medicine and out-of-pocket costs" },
  { key: "personal", label: "Personal care", description: "Clothing, grooming and household essentials" },
  { key: "leisure", label: "Leisure", description: "Fitness, entertainment and recreation" },
]

export const dataEdition = "September 2026"

// Each record models the same monthly basket for one adult using the balanced
// lifestyle setting. The original flexible-spend amount is partitioned into
// dining, healthcare, personal care and leisure so totals remain comparable to
// earlier editions. Values are USD-equivalent planning estimates rounded to
// practical amounts, not live quotes or a promise of an individual budget.
function defineCity(
  slug: string,
  city: string,
  country: string,
  currency: string,
  currencySymbol: string,
  housing: number,
  groceries: number,
  transport: number,
  utilities: number,
  flexibleSpending: number,
  region?: string,
): CityCost {
  const dining = Math.round(flexibleSpending * 0.3 / 10) * 10
  const healthcare = Math.round(flexibleSpending * 0.2 / 10) * 10
  const personal = Math.round(flexibleSpending * 0.15 / 10) * 10
  const leisure = flexibleSpending - dining - healthcare - personal

  return {
    slug,
    city,
    region,
    country,
    currency,
    currencySymbol,
    updated: dataEdition,
    costs: { housing, groceries, dining, transport, utilities, healthcare, personal, leisure },
  }
}

// Add one complete record here and it becomes searchable in every calculator,
// available to dynamic comparison routes and included in the city index.
export const cities: CityCost[] = [
  defineCity("london", "London", "United Kingdom", "GBP", "£", 2300, 520, 220, 310, 650),
  defineCity("amsterdam", "Amsterdam", "Netherlands", "EUR", "€", 1950, 480, 120, 270, 600),
  defineCity("new-york", "New York", "United States", "USD", "$", 3200, 650, 132, 280, 780, "New York"),
  defineCity("lisbon", "Lisbon", "Portugal", "EUR", "€", 1300, 370, 55, 180, 420),
  defineCity("dubai", "Dubai", "United Arab Emirates", "AED", "د.إ", 2200, 500, 210, 250, 700),
  defineCity("karachi", "Karachi", "Pakistan", "PKR", "₨", 350, 210, 45, 85, 180),

  defineCity("los-angeles", "Los Angeles", "United States", "USD", "$", 2500, 540, 130, 240, 730, "California"),
  defineCity("san-francisco", "San Francisco", "United States", "USD", "$", 3300, 640, 145, 270, 740, "California"),
  defineCity("seattle", "Seattle", "United States", "USD", "$", 2200, 600, 140, 260, 740, "Washington"),
  defineCity("chicago", "Chicago", "United States", "USD", "$", 1800, 530, 125, 235, 640, "Illinois"),
  defineCity("boston", "Boston", "United States", "USD", "$", 2700, 590, 135, 250, 730, "Massachusetts"),
  defineCity("washington-dc", "Washington, DC", "United States", "USD", "$", 2400, 580, 135, 250, 670, "District of Columbia"),
  defineCity("miami", "Miami", "United States", "USD", "$", 2300, 550, 125, 235, 650, "Florida"),
  defineCity("austin", "Austin", "United States", "USD", "$", 1700, 500, 115, 215, 620, "Texas"),
  defineCity("toronto", "Toronto", "Canada", "CAD", "C$", 2100, 520, 125, 230, 620, "Ontario"),
  defineCity("vancouver", "Vancouver", "Canada", "CAD", "C$", 2300, 560, 125, 235, 620, "British Columbia"),
  defineCity("montreal", "Montreal", "Canada", "CAD", "C$", 1400, 530, 120, 225, 590, "Quebec"),
  defineCity("calgary", "Calgary", "Canada", "CAD", "C$", 1500, 520, 120, 230, 610, "Alberta"),
  defineCity("mexico-city", "Mexico City", "Mexico", "MXN", "Mex$", 1050, 330, 85, 160, 380),
  defineCity("monterrey", "Monterrey", "Mexico", "MXN", "Mex$", 850, 340, 85, 160, 370),
  defineCity("panama-city", "Panama City", "Panama", "PAB", "B/.", 1000, 440, 100, 190, 450),
  defineCity("san-jose", "San José", "Costa Rica", "CRC", "₡", 900, 390, 95, 180, 420),
  defineCity("houston", "Houston", "United States", "USD", "$", 1700, 470, 110, 210, 570, "Texas"),
  defineCity("dallas", "Dallas", "United States", "USD", "$", 1800, 490, 115, 215, 600, "Texas"),
  defineCity("atlanta", "Atlanta", "United States", "USD", "$", 1900, 550, 125, 235, 600, "Georgia"),
  defineCity("philadelphia", "Philadelphia", "United States", "USD", "$", 1900, 570, 130, 240, 600, "Pennsylvania"),
  defineCity("denver", "Denver", "United States", "USD", "$", 2000, 520, 125, 230, 630, "Colorado"),
  defineCity("san-diego", "San Diego", "United States", "USD", "$", 2600, 530, 125, 235, 650, "California"),
  defineCity("san-jose-ca", "San Jose", "United States", "USD", "$", 3000, 520, 125, 230, 620, "California"),
  defineCity("phoenix", "Phoenix", "United States", "USD", "$", 1700, 500, 120, 220, 600, "Arizona"),
  defineCity("san-antonio", "San Antonio", "United States", "USD", "$", 1500, 470, 110, 205, 580, "Texas"),
  defineCity("fort-worth", "Fort Worth", "United States", "USD", "$", 1700, 510, 115, 215, 570, "Texas"),
  defineCity("el-paso", "El Paso", "United States", "USD", "$", 1100, 430, 100, 190, 440, "Texas"),
  defineCity("arlington", "Arlington", "United States", "USD", "$", 1600, 500, 115, 210, 540, "Texas"),
  defineCity("plano", "Plano", "United States", "USD", "$", 1900, 550, 120, 230, 530, "Texas"),
  defineCity("corpus-christi", "Corpus Christi", "United States", "USD", "$", 1300, 450, 105, 200, 480, "Texas"),
  defineCity("newark", "Newark", "United States", "USD", "$", 2200, 570, 130, 240, 620, "New Jersey"),
  defineCity("jersey-city", "Jersey City", "United States", "USD", "$", 2900, 570, 130, 240, 620, "New Jersey"),
  defineCity("trenton", "Trenton", "United States", "USD", "$", 1700, 520, 120, 220, 540, "New Jersey"),
  defineCity("atlantic-city", "Atlantic City", "United States", "USD", "$", 1500, 500, 110, 215, 530, "New Jersey"),
  defineCity("portland", "Portland", "United States", "USD", "$", 1900, 540, 125, 235, 620, "Oregon"),
  defineCity("las-vegas", "Las Vegas", "United States", "USD", "$", 1700, 470, 115, 215, 610, "Nevada"),
  defineCity("orlando", "Orlando", "United States", "USD", "$", 1800, 500, 115, 220, 590, "Florida"),
  defineCity("tampa", "Tampa", "United States", "USD", "$", 1900, 560, 125, 235, 620, "Florida"),
  defineCity("minneapolis", "Minneapolis", "United States", "USD", "$", 1800, 560, 130, 240, 650, "Minnesota"),
  defineCity("detroit", "Detroit", "United States", "USD", "$", 1400, 500, 115, 220, 570, "Michigan"),
  defineCity("baltimore", "Baltimore", "United States", "USD", "$", 1700, 540, 125, 230, 610, "Maryland"),
  defineCity("charlotte", "Charlotte", "United States", "USD", "$", 1700, 510, 120, 220, 580, "North Carolina"),
  defineCity("nashville", "Nashville", "United States", "USD", "$", 1900, 530, 125, 230, 620, "Tennessee"),
  defineCity("new-orleans", "New Orleans", "United States", "USD", "$", 1600, 510, 120, 230, 630, "Louisiana"),
  defineCity("kansas-city", "Kansas City", "United States", "USD", "$", 1400, 470, 110, 210, 620, "Missouri"),
  defineCity("st-louis", "St. Louis", "United States", "USD", "$", 1300, 500, 110, 215, 570, "Missouri"),
  defineCity("cleveland", "Cleveland", "United States", "USD", "$", 1300, 550, 120, 230, 650, "Ohio"),
  defineCity("cincinnati", "Cincinnati", "United States", "USD", "$", 1400, 480, 110, 210, 550, "Ohio"),
  defineCity("indianapolis", "Indianapolis", "United States", "USD", "$", 1300, 500, 110, 215, 570, "Indiana"),
  defineCity("columbus", "Columbus", "United States", "USD", "$", 1500, 500, 115, 220, 580, "Ohio"),
  defineCity("sacramento", "Sacramento", "United States", "USD", "$", 1900, 570, 130, 240, 600, "California"),
  defineCity("pittsburgh", "Pittsburgh", "United States", "USD", "$", 1400, 600, 135, 245, 570, "Pennsylvania"),
  defineCity("milwaukee", "Milwaukee", "United States", "USD", "$", 1400, 530, 120, 225, 580, "Wisconsin"),
  defineCity("honolulu", "Honolulu", "United States", "USD", "$", 2500, 700, 145, 290, 750, "Hawaii"),
  defineCity("oklahoma-city", "Oklahoma City", "United States", "USD", "$", 1200, 510, 110, 210, 500, "Oklahoma"),
  defineCity("louisville", "Louisville", "United States", "USD", "$", 1200, 510, 110, 215, 580, "Kentucky"),
  defineCity("memphis", "Memphis", "United States", "USD", "$", 1200, 460, 105, 205, 580, "Tennessee"),
  defineCity("albuquerque", "Albuquerque", "United States", "USD", "$", 1300, 490, 110, 210, 550, "New Mexico"),
  defineCity("tucson", "Tucson", "United States", "USD", "$", 1200, 470, 105, 210, 560, "Arizona"),
  defineCity("omaha", "Omaha", "United States", "USD", "$", 1300, 520, 120, 230, 660, "Nebraska"),
  defineCity("richmond", "Richmond", "United States", "USD", "$", 1500, 490, 115, 220, 640, "Virginia"),
  defineCity("buffalo", "Buffalo", "United States", "USD", "$", 1200, 520, 120, 230, 610, "New York"),
  defineCity("raleigh", "Raleigh", "United States", "USD", "$", 1600, 510, 115, 220, 590, "North Carolina"),
  defineCity("salt-lake-city", "Salt Lake City", "United States", "USD", "$", 1700, 470, 115, 210, 560, "Utah"),
  defineCity("virginia-beach", "Virginia Beach", "United States", "USD", "$", 1600, 500, 120, 225, 580, "Virginia"),
  defineCity("birmingham-al", "Birmingham", "United States", "USD", "$", 1200, 570, 125, 240, 620, "Alabama"),
  defineCity("charleston", "Charleston", "United States", "USD", "$", 1900, 550, 125, 235, 650, "South Carolina"),
  defineCity("jacksonville", "Jacksonville", "United States", "USD", "$", 1600, 500, 115, 220, 570, "Florida"),
  defineCity("fresno", "Fresno", "United States", "USD", "$", 1500, 500, 115, 220, 540, "California"),
  defineCity("colorado-springs", "Colorado Springs", "United States", "USD", "$", 1600, 510, 115, 220, 570, "Colorado"),
  defineCity("oakland", "Oakland", "United States", "USD", "$", 2800, 600, 140, 260, 700, "California"),
  defineCity("anaheim", "Anaheim", "United States", "USD", "$", 2400, 570, 130, 240, 660, "California"),
  defineCity("reno", "Reno", "United States", "USD", "$", 1700, 520, 120, 225, 600, "Nevada"),
  defineCity("boise", "Boise", "United States", "USD", "$", 1600, 500, 115, 215, 560, "Idaho"),
  defineCity("ottawa", "Ottawa", "Canada", "CAD", "C$", 1500, 520, 120, 230, 620, "Ontario"),
  defineCity("edmonton", "Edmonton", "Canada", "CAD", "C$", 1400, 510, 120, 225, 610, "Alberta"),
  defineCity("winnipeg", "Winnipeg", "Canada", "CAD", "C$", 1200, 520, 115, 220, 530, "Manitoba"),
  defineCity("quebec-city", "Quebec City", "Canada", "CAD", "C$", 1100, 520, 110, 215, 550, "Quebec"),
  defineCity("halifax", "Halifax", "Canada", "CAD", "C$", 1600, 590, 125, 235, 550, "Nova Scotia"),
  defineCity("victoria", "Victoria", "Canada", "CAD", "C$", 1900, 570, 125, 235, 650, "British Columbia"),
  defineCity("saskatoon", "Saskatoon", "Canada", "CAD", "C$", 1200, 510, 115, 220, 590, "Saskatchewan"),
  defineCity("regina", "Regina", "Canada", "CAD", "C$", 1100, 520, 110, 215, 560, "Saskatchewan"),
  defineCity("mississauga", "Mississauga", "Canada", "CAD", "C$", 2000, 510, 120, 225, 550, "Ontario"),
  defineCity("hamilton-on", "Hamilton", "Canada", "CAD", "C$", 1600, 500, 115, 215, 570, "Ontario"),
  defineCity("kitchener", "Kitchener", "Canada", "CAD", "C$", 1500, 500, 115, 220, 590, "Ontario"),
  defineCity("london-on", "London", "Canada", "CAD", "C$", 1400, 490, 115, 220, 640, "Ontario"),
  defineCity("windsor", "Windsor", "Canada", "CAD", "C$", 1200, 490, 110, 215, 600, "Ontario"),
  defineCity("kelowna", "Kelowna", "Canada", "CAD", "C$", 1800, 490, 115, 220, 600, "British Columbia"),
  defineCity("st-johns", "St. John's", "Canada", "CAD", "C$", 1200, 520, 115, 225, 560, "Newfoundland and Labrador"),
  defineCity("guadalajara", "Guadalajara", "Mexico", "MXN", "Mex$", 700, 320, 80, 150, 330),

  defineCity("sao-paulo", "São Paulo", "Brazil", "BRL", "R$", 700, 310, 85, 160, 330),
  defineCity("rio-de-janeiro", "Rio de Janeiro", "Brazil", "BRL", "R$", 650, 310, 85, 155, 310),
  defineCity("buenos-aires", "Buenos Aires", "Argentina", "ARS", "$", 750, 290, 80, 155, 350),
  defineCity("santiago", "Santiago", "Chile", "CLP", "$", 850, 360, 95, 175, 450),
  defineCity("lima", "Lima", "Peru", "PEN", "S/", 650, 320, 80, 150, 280),
  defineCity("bogota", "Bogotá", "Colombia", "COP", "$", 600, 260, 75, 140, 250),
  defineCity("medellin", "Medellín", "Colombia", "COP", "$", 550, 270, 75, 140, 260),
  defineCity("montevideo", "Montevideo", "Uruguay", "UYU", "$U", 850, 380, 100, 185, 450),
  defineCity("quito", "Quito", "Ecuador", "USD", "$", 600, 350, 90, 165, 330),
  defineCity("caracas", "Caracas", "Venezuela", "VES", "Bs.", 650, 340, 95, 175, 450),
  defineCity("brasilia", "Brasília", "Brazil", "BRL", "R$", 650, 300, 85, 160, 330),
  defineCity("belo-horizonte", "Belo Horizonte", "Brazil", "BRL", "R$", 500, 270, 80, 145, 250),
  defineCity("curitiba", "Curitiba", "Brazil", "BRL", "R$", 550, 280, 80, 145, 270),
  defineCity("santo-domingo", "Santo Domingo", "Dominican Republic", "DOP", "RD$", 700, 370, 90, 170, 360),
  defineCity("guatemala-city", "Guatemala City", "Guatemala", "GTQ", "Q", 650, 370, 90, 170, 350),
  defineCity("guayaquil", "Guayaquil", "Ecuador", "USD", "$", 550, 330, 85, 160, 300),
  defineCity("la-paz", "La Paz", "Bolivia", "BOB", "Bs.", 500, 320, 80, 155, 290),

  defineCity("paris", "Paris", "France", "EUR", "€", 2100, 580, 135, 250, 670),
  defineCity("berlin", "Berlin", "Germany", "EUR", "€", 1450, 450, 115, 220, 540),
  defineCity("munich", "Munich", "Germany", "EUR", "€", 1700, 500, 125, 235, 640),
  defineCity("frankfurt", "Frankfurt", "Germany", "EUR", "€", 1450, 460, 120, 225, 570),
  defineCity("madrid", "Madrid", "Spain", "EUR", "€", 1400, 410, 105, 200, 550),
  defineCity("barcelona", "Barcelona", "Spain", "EUR", "€", 1450, 410, 110, 205, 540),
  defineCity("rome", "Rome", "Italy", "EUR", "€", 1350, 480, 120, 225, 600),
  defineCity("milan", "Milan", "Italy", "EUR", "€", 1650, 480, 125, 230, 660),
  defineCity("vienna", "Vienna", "Austria", "EUR", "€", 1350, 470, 115, 220, 580),
  defineCity("zurich", "Zurich", "Switzerland", "CHF", "CHF", 2500, 790, 185, 340, 960),
  defineCity("geneva", "Geneva", "Switzerland", "CHF", "CHF", 2550, 700, 165, 305, 930),
  defineCity("brussels", "Brussels", "Belgium", "EUR", "€", 1350, 490, 125, 230, 640),
  defineCity("dublin", "Dublin", "Ireland", "EUR", "€", 2200, 480, 130, 240, 680),
  defineCity("copenhagen", "Copenhagen", "Denmark", "DKK", "kr.", 1700, 520, 140, 255, 810),
  defineCity("stockholm", "Stockholm", "Sweden", "SEK", "kr.", 1500, 520, 130, 240, 670),
  defineCity("oslo", "Oslo", "Norway", "NOK", "kr.", 1650, 640, 150, 285, 850),
  defineCity("helsinki", "Helsinki", "Finland", "EUR", "€", 1350, 510, 125, 235, 680),
  defineCity("prague", "Prague", "Czechia", "CZK", "Kč", 1100, 390, 100, 185, 410),
  defineCity("warsaw", "Warsaw", "Poland", "PLN", "zł", 1000, 320, 90, 170, 410),
  defineCity("budapest", "Budapest", "Hungary", "HUF", "Ft", 900, 350, 95, 175, 410),
  defineCity("athens", "Athens", "Greece", "EUR", "€", 850, 400, 105, 200, 540),
  defineCity("bucharest", "Bucharest", "Romania", "RON", "lei", 700, 320, 85, 165, 390),
  defineCity("sofia", "Sofia", "Bulgaria", "BGN", "лв", 650, 340, 90, 165, 380),
  defineCity("istanbul", "Istanbul", "Turkey", "TRY", "₺", 850, 260, 80, 145, 240),
  defineCity("tallinn", "Tallinn", "Estonia", "EUR", "€", 900, 370, 105, 195, 520),
  defineCity("riga", "Riga", "Latvia", "EUR", "€", 750, 350, 100, 185, 470),
  defineCity("vilnius", "Vilnius", "Lithuania", "EUR", "€", 800, 340, 95, 175, 460),
  defineCity("reykjavik", "Reykjavik", "Iceland", "ISK", "kr.", 1900, 620, 145, 275, 810),
  defineCity("luxembourg", "Luxembourg", "Luxembourg", "EUR", "€", 2200, 550, 135, 250, 750),
  defineCity("dusseldorf", "Düsseldorf", "Germany", "EUR", "€", 1400, 430, 115, 220, 580),
  defineCity("hamburg", "Hamburg", "Germany", "EUR", "€", 1450, 450, 120, 225, 580),
  defineCity("manchester", "Manchester", "United Kingdom", "GBP", "£", 1350, 500, 120, 230, 680),
  defineCity("lyon", "Lyon", "France", "EUR", "€", 1300, 550, 125, 235, 600),
  defineCity("rotterdam", "Rotterdam", "Netherlands", "EUR", "€", 1550, 490, 125, 235, 630),
  defineCity("porto", "Porto", "Portugal", "EUR", "€", 1000, 370, 90, 175, 380),
  defineCity("valencia", "Valencia", "Spain", "EUR", "€", 1050, 390, 95, 185, 470),
  defineCity("edinburgh", "Edinburgh", "United Kingdom", "GBP", "£", 1600, 500, 120, 230, 660),
  defineCity("moscow", "Moscow", "Russia", "RUB", "₽", 1100, 320, 90, 170, 430),
  defineCity("almaty", "Almaty", "Kazakhstan", "KZT", "₸", 650, 280, 80, 145, 290),
  defineCity("tbilisi", "Tbilisi", "Georgia", "GEL", "₾", 650, 280, 80, 145, 290),
  defineCity("basel", "Basel", "Switzerland", "CHF", "CHF", 2200, 800, 185, 340, 950),
  defineCity("bern", "Bern", "Switzerland", "CHF", "CHF", 2000, 730, 170, 320, 880),
  defineCity("lausanne", "Lausanne", "Switzerland", "CHF", "CHF", 2300, 750, 175, 330, 920),
  defineCity("zug", "Zug", "Switzerland", "CHF", "CHF", 2800, 780, 180, 335, 950),
  defineCity("bergen", "Bergen", "Norway", "NOK", "kr.", 1450, 630, 145, 280, 800),
  defineCity("stavanger", "Stavanger", "Norway", "NOK", "kr.", 1500, 650, 150, 290, 830),
  defineCity("trondheim", "Trondheim", "Norway", "NOK", "kr.", 1300, 620, 145, 275, 800),
  defineCity("aarhus", "Aarhus", "Denmark", "DKK", "kr.", 1300, 500, 130, 245, 750),
  defineCity("gothenburg", "Gothenburg", "Sweden", "SEK", "kr.", 1250, 490, 120, 225, 640),
  defineCity("malmo", "Malmö", "Sweden", "SEK", "kr.", 1100, 500, 120, 225, 650),
  defineCity("tampere", "Tampere", "Finland", "EUR", "€", 1050, 470, 115, 215, 690),
  defineCity("the-hague", "The Hague", "Netherlands", "EUR", "€", 1500, 490, 125, 235, 630),
  defineCity("utrecht", "Utrecht", "Netherlands", "EUR", "€", 1600, 490, 125, 235, 700),
  defineCity("eindhoven", "Eindhoven", "Netherlands", "EUR", "€", 1300, 480, 120, 225, 650),
  defineCity("stuttgart", "Stuttgart", "Germany", "EUR", "€", 1450, 440, 115, 220, 590),
  defineCity("cologne", "Cologne", "Germany", "EUR", "€", 1400, 450, 115, 220, 560),
  defineCity("cork", "Cork", "Ireland", "EUR", "€", 1600, 480, 125, 235, 670),
  defineCity("antwerp", "Antwerp", "Belgium", "EUR", "€", 1200, 470, 115, 220, 620),
  defineCity("salzburg", "Salzburg", "Austria", "EUR", "€", 1300, 500, 115, 220, 590),
  defineCity("toulouse", "Toulouse", "France", "EUR", "€", 1150, 540, 120, 230, 640),
  defineCity("bordeaux", "Bordeaux", "France", "EUR", "€", 1300, 540, 120, 230, 620),
  defineCity("birmingham-uk", "Birmingham", "United Kingdom", "GBP", "£", 1250, 460, 115, 220, 580, "England"),
  defineCity("bristol", "Bristol", "United Kingdom", "GBP", "£", 1500, 460, 120, 225, 680, "England"),

  defineCity("abu-dhabi", "Abu Dhabi", "United Arab Emirates", "AED", "د.إ", 1900, 410, 105, 200, 520),
  defineCity("doha", "Doha", "Qatar", "QAR", "ر.ق", 1800, 440, 110, 210, 550),
  defineCity("riyadh", "Riyadh", "Saudi Arabia", "SAR", "ر.س", 1100, 380, 100, 190, 420),
  defineCity("tel-aviv", "Tel Aviv", "Israel", "ILS", "₪", 2100, 580, 145, 270, 820),
  defineCity("cairo", "Cairo", "Egypt", "EGP", "E£", 450, 290, 80, 150, 300),
  defineCity("casablanca", "Casablanca", "Morocco", "MAD", "د.م.", 650, 310, 85, 155, 280),
  defineCity("nairobi", "Nairobi", "Kenya", "KES", "KSh", 700, 310, 85, 155, 320),
  defineCity("johannesburg", "Johannesburg", "South Africa", "ZAR", "R", 750, 330, 90, 170, 400),
  defineCity("cape-town", "Cape Town", "South Africa", "ZAR", "R", 1000, 330, 90, 165, 400),
  defineCity("lagos", "Lagos", "Nigeria", "NGN", "₦", 1000, 350, 85, 160, 310),
  defineCity("accra", "Accra", "Ghana", "GHS", "GH₵", 850, 360, 85, 160, 340),
  defineCity("tunis", "Tunis", "Tunisia", "TND", "د.ت", 450, 290, 75, 145, 210),
  defineCity("addis-ababa", "Addis Ababa", "Ethiopia", "ETB", "Br", 700, 340, 100, 185, 250),
  defineCity("jeddah", "Jeddah", "Saudi Arabia", "SAR", "ر.س", 1000, 380, 95, 185, 380),
  defineCity("kuwait-city", "Kuwait City", "Kuwait", "KWD", "د.ك", 1500, 350, 100, 180, 450),
  defineCity("manama", "Manama", "Bahrain", "BHD", "د.ب", 1400, 380, 105, 190, 470),
  defineCity("amman", "Amman", "Jordan", "JOD", "د.ا", 650, 370, 100, 185, 450),
  defineCity("beirut", "Beirut", "Lebanon", "LBP", "ل.ل", 900, 500, 100, 220, 600),
  defineCity("muscat", "Muscat", "Oman", "OMR", "ر.ع.", 1000, 400, 100, 185, 450),
  defineCity("kampala", "Kampala", "Uganda", "UGX", "USh", 500, 310, 85, 155, 280),
  defineCity("dar-es-salaam", "Dar es Salaam", "Tanzania", "TZS", "TSh", 550, 300, 85, 150, 250),

  defineCity("lahore", "Lahore", "Pakistan", "PKR", "₨", 320, 220, 70, 125, 210),
  defineCity("islamabad", "Islamabad", "Pakistan", "PKR", "₨", 420, 220, 70, 125, 220),
  defineCity("delhi", "Delhi", "India", "INR", "₹", 500, 280, 75, 140, 270),
  defineCity("mumbai", "Mumbai", "India", "INR", "₹", 900, 300, 75, 140, 280),
  defineCity("bengaluru", "Bengaluru", "India", "INR", "₹", 550, 300, 75, 140, 230),
  defineCity("hyderabad", "Hyderabad", "India", "INR", "₹", 450, 300, 75, 135, 220),
  defineCity("dhaka", "Dhaka", "Bangladesh", "BDT", "৳", 400, 310, 80, 155, 270),
  defineCity("bangkok", "Bangkok", "Thailand", "THB", "฿", 950, 420, 100, 185, 280),
  defineCity("singapore", "Singapore", "Singapore", "SGD", "S$", 2500, 550, 135, 250, 540),
  defineCity("kuala-lumpur", "Kuala Lumpur", "Malaysia", "MYR", "RM", 700, 360, 85, 160, 270),
  defineCity("jakarta", "Jakarta", "Indonesia", "IDR", "Rp", 650, 370, 90, 165, 260),
  defineCity("manila", "Manila", "Philippines", "PHP", "₱", 850, 360, 90, 165, 280),
  defineCity("ho-chi-minh-city", "Ho Chi Minh City", "Vietnam", "VND", "₫", 700, 360, 85, 160, 250),
  defineCity("hanoi", "Hanoi", "Vietnam", "VND", "₫", 600, 350, 85, 155, 230),
  defineCity("hong-kong", "Hong Kong", "Hong Kong", "HKD", "HK$", 2500, 580, 130, 240, 520),
  defineCity("taipei", "Taipei", "Taiwan", "TWD", "NT$", 950, 560, 115, 215, 350),
  defineCity("tokyo", "Tokyo", "Japan", "JPY", "¥", 1450, 630, 135, 250, 480),
  defineCity("osaka", "Osaka", "Japan", "JPY", "¥", 1100, 570, 125, 235, 420),
  defineCity("seoul", "Seoul", "South Korea", "KRW", "₩", 1250, 640, 130, 240, 440),
  defineCity("beijing", "Beijing", "China", "CNY", "¥", 1200, 400, 95, 180, 390),
  defineCity("shanghai", "Shanghai", "China", "CNY", "¥", 1400, 450, 100, 190, 410),
  defineCity("guangzhou", "Guangzhou", "China", "CNY", "¥", 900, 380, 90, 165, 300),
  defineCity("shenzhen", "Shenzhen", "China", "CNY", "¥", 1200, 450, 100, 190, 350),
  defineCity("chengdu", "Chengdu", "China", "CNY", "¥", 700, 410, 85, 170, 300),
  defineCity("tianjin", "Tianjin", "China", "CNY", "¥", 800, 380, 90, 170, 320),
  defineCity("chongqing", "Chongqing", "China", "CNY", "¥", 650, 390, 85, 160, 290),
  defineCity("hangzhou", "Hangzhou", "China", "CNY", "¥", 1000, 450, 95, 185, 340),
  defineCity("nanjing", "Nanjing", "China", "CNY", "¥", 850, 380, 90, 170, 310),
  defineCity("wuhan", "Wuhan", "China", "CNY", "¥", 700, 370, 85, 160, 290),
  defineCity("chennai", "Chennai", "India", "INR", "₹", 400, 290, 75, 135, 210),
  defineCity("pune", "Pune", "India", "INR", "₹", 450, 290, 75, 140, 250),
  defineCity("ahmedabad", "Ahmedabad", "India", "INR", "₹", 350, 290, 70, 135, 230),
  defineCity("colombo", "Colombo", "Sri Lanka", "LKR", "Rs", 600, 360, 85, 155, 230),
  defineCity("yokohama", "Yokohama", "Japan", "JPY", "¥", 1300, 610, 130, 240, 450),
  defineCity("busan", "Busan", "South Korea", "KRW", "₩", 850, 560, 115, 215, 380),
  defineCity("sharjah", "Sharjah", "United Arab Emirates", "AED", "د.إ", 1400, 400, 105, 200, 380),

  defineCity("sydney", "Sydney", "Australia", "AUD", "A$", 2300, 560, 130, 245, 620, "New South Wales"),
  defineCity("melbourne", "Melbourne", "Australia", "AUD", "A$", 1800, 550, 125, 235, 630, "Victoria"),
  defineCity("brisbane", "Brisbane", "Australia", "AUD", "A$", 1600, 560, 130, 240, 630, "Queensland"),
  defineCity("perth", "Perth", "Australia", "AUD", "A$", 1500, 550, 125, 235, 610, "Western Australia"),
  defineCity("auckland", "Auckland", "New Zealand", "NZD", "NZ$", 1750, 540, 130, 240, 650),
  defineCity("wellington", "Wellington", "New Zealand", "NZD", "NZ$", 1600, 540, 125, 235, 590),
  defineCity("adelaide", "Adelaide", "Australia", "AUD", "A$", 1400, 550, 125, 235, 570, "South Australia"),
  defineCity("canberra", "Canberra", "Australia", "AUD", "A$", 1750, 550, 125, 235, 650, "Australian Capital Territory"),
  defineCity("gold-coast", "Gold Coast", "Australia", "AUD", "A$", 1700, 530, 120, 230, 620, "Queensland"),
  defineCity("newcastle-au", "Newcastle", "Australia", "AUD", "A$", 1450, 540, 120, 230, 650, "New South Wales"),
  defineCity("hobart", "Hobart", "Australia", "AUD", "A$", 1350, 520, 115, 225, 610, "Tasmania"),
  defineCity("darwin", "Darwin", "Australia", "AUD", "A$", 1600, 590, 130, 245, 680, "Northern Territory"),
  defineCity("wollongong", "Wollongong", "Australia", "AUD", "A$", 1500, 530, 120, 230, 620, "New South Wales"),
  defineCity("cairns", "Cairns", "Australia", "AUD", "A$", 1350, 520, 115, 225, 600, "Queensland"),
  defineCity("geelong", "Geelong", "Australia", "AUD", "A$", 1400, 520, 115, 225, 590, "Victoria"),
  defineCity("sunshine-coast", "Sunshine Coast", "Australia", "AUD", "A$", 1600, 530, 120, 230, 610, "Queensland"),
  defineCity("christchurch", "Christchurch", "New Zealand", "NZD", "NZ$", 1200, 520, 120, 225, 590),
]

export const householdMultipliers = { single: 1, couple: 1.55, family: 2.2 } as const
export const lifestyleMultipliers = { lean: 0.82, balanced: 1, comfortable: 1.25 } as const

export const defaultComparison = {
  from: cities[0].slug,
  to: cities[1].slug,
} as const

const cityBySlug = new Map(cities.map((city) => [city.slug, city]))

// The first SEO cohort intentionally focuses on high-demand global hubs. The
// comparison tool remains dynamic for every city pair, but only this curated
// cohort is promoted to search engines at launch. Expand this list in measured
// batches as Search Console data and editorial coverage justify it.
export const launchComparisonCitySlugs = [
  "amsterdam",
  "austin",
  "berlin",
  "dubai",
  "london",
  "los-angeles",
  "melbourne",
  "new-york",
  "paris",
  "san-francisco",
  "singapore",
  "sydney",
  "tokyo",
  "toronto",
  "vancouver",
  "zurich",
] as const

// These are the comparison links promoted in the launch directory. Keeping
// the directory on the same curated cohort as the sitemap prevents cards from
// pointing at pages that a static or stale launch build has not generated yet.
export const launchComparisonPairSlugs = [
  ["amsterdam", "london"],
  ["new-york", "san-francisco"],
  ["toronto", "vancouver"],
  ["melbourne", "sydney"],
  ["dubai", "london"],
  ["berlin", "paris"],
] as const

export function getIndexableComparisonPairs() {
  const launchCities = launchComparisonCitySlugs.map((slug) => getCity(slug))
  return launchCities.flatMap((from, fromIndex) => launchCities
    .slice(fromIndex + 1)
    .map((to) => ({ from, to })))
}

export function isIndexableComparison(firstSlug: string, secondSlug: string) {
  const key = getCanonicalComparisonPath(firstSlug, secondSlug)
  return getIndexableComparisonPairs().some(({ from, to }) => getCanonicalComparisonPath(from.slug, to.slug) === key)
}

export function getCity(slug: string) {
  const city = cityBySlug.get(slug)
  if (!city) throw new Error(`Unknown city slug: ${slug}`)
  return city
}

export function getCityDisplayName(city: CityCost) {
  return [city.city, city.region].filter(Boolean).join(", ")
}

export function getCityLocation(city: CityCost) {
  return [getCityDisplayName(city), city.country].filter(Boolean).join(", ")
}

export function getComparisonPath(firstSlug: string, secondSlug: string) {
  return `/compare/${firstSlug}-vs-${secondSlug}`
}

export function getCanonicalComparisonPath(firstSlug: string, secondSlug: string) {
  return firstSlug.localeCompare(secondSlug) <= 0
    ? getComparisonPath(firstSlug, secondSlug)
    : getComparisonPath(secondSlug, firstSlug)
}

export function getPossibleComparisonCount(cityCount = cities.length) {
  return cityCount < 2 ? 0 : cityCount * (cityCount - 1) / 2
}

export function getLaunchComparisonPairs(limit: number = launchComparisonPairSlugs.length) {
  return launchComparisonPairSlugs.slice(0, limit).map(([fromSlug, toSlug]) => ({
    from: getCity(fromSlug),
    to: getCity(toSlug),
  }))
}

export function getFeaturedCityPairs(limit = 6) {
  return getLaunchComparisonPairs(limit)
}

export function getMonthlyCost(city: CityCost, household: keyof typeof householdMultipliers, lifestyle: keyof typeof lifestyleMultipliers) {
  const base = Object.values(city.costs).reduce((sum, value) => sum + value, 0)
  return Math.round((base * householdMultipliers[household] * lifestyleMultipliers[lifestyle]) / 10) * 10
}

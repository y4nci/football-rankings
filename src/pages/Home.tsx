import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

import { getCurrentSeason } from '../utils/datetime';

const GEO_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

const leagueCoordinates = {
    "Women's Olympic Soccer Tournament": [139.6917, 35.6895], // Tokyo, Japan (Example for recent Olympics)
    "Men's Olympic Soccer Tournament": [139.6917, 35.6895], // Tokyo, Japan (Example for recent Olympics)
    'MLS': [-77.0369, 38.9072], // Washington D.C., USA (MLS HQ)
    'Leagues Cup': [-99.1332, 19.4326], // Mexico City, Mexico
    'NWSL': [-77.0369, 38.9072], // Washington D.C., USA (NWSL HQ)
    'Mexican Liga BBVA MX': [-99.1332, 19.4326], // Mexico City, Mexico
    'English Premier League': [-0.1276, 51.5074], // London, England
    'Spanish LALIGA': [-3.7038, 40.4168], // Madrid, Spain
    'German Bundesliga': [13.4050, 52.5200], // Berlin, Germany
    'Italian Serie A': [12.4964, 41.9028], // Rome, Italy
    'English League Championship': [-0.1276, 51.5074], // London, England
    'French Ligue 1': [2.3522, 48.8566], // Paris, France
    'Dutch Eredivisie': [4.9041, 52.3676], // Amsterdam, Netherlands
    'Portuguese Primeira Liga': [-9.1393, 38.7223], // Lisbon, Portugal
    'UEFA Champions League': [6.6323, 46.5197], // Nyon, Switzerland (UEFA HQ)
    'UEFA Europa League': [6.6323, 46.5197], // Nyon, Switzerland (UEFA HQ)
    'UEFA Conference League': [6.6323, 46.5197], // Nyon, Switzerland (UEFA HQ)
    'UEFA European Under-19 Championship': [6.6323, 46.5197], // Nyon, Switzerland (UEFA HQ)
    'Saudi Pro League': [46.6753, 24.7136], // Riyadh, Saudi Arabia
    "UEFA Women's Champions League": [6.6323, 46.5197], // Nyon, Switzerland (UEFA HQ)
    "English Women's Super League": [-0.1276, 51.5074], // London, England
    'AFC Champions League': [51.1657, 25.276987], // Doha, Qatar (Example for recent finals)
    'Scottish Premiership': [-3.1883, 55.9533], // Edinburgh, Scotland
    'Spanish Liga F': [-3.7038, 40.4168], // Madrid, Spain
    'French Division 1 Féminine': [2.3522, 48.8566], // Paris, France
    'USL Championship': [-77.0369, 38.9072], // Washington D.C., USA (USL HQ)
    'USL League One': [-77.0369, 38.9072], // Washington D.C., USA (USL HQ)
    'USL Jägermeister Cup': [-77.0369, 38.9072], // Washington D.C., USA (USL HQ)
    'Mexican Liga de Expansión MX': [-99.1332, 19.4326], // Mexico City, Mexico
    'Mexican Copa MX': [-99.1332, 19.4326], // Mexico City, Mexico
    'Australian A-League Men': [151.2093, -33.8688], // Sydney, Australia
    'Australian A-League Women': [151.2093, -33.8688], // Sydney, Australia
    'CONMEBOL Libertadores': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    'Turkish Super Lig': [32.8597, 39.9334], // Ankara, Turkey
    'FIFA World Cup': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    "FIFA Women's World Cup": [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - Concacaf': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - UEFA': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - CONMEBOL': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - CAF': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - AFC': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'FIFA World Cup Qualifying - OFC': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    "FIFA Women's World Cup Qualifying - UEFA": [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'Concacaf Gold Cup': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'Concacaf W Gold Cup': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'Concacaf Nations League': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'Concacaf Nations League Qualifying': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'Concacaf W Championship': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'UEFA European Championship': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'UEFA European Championship Qualifying': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    "UEFA Women's European Championship": [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'UEFA Nations League': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'Copa América': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    'Copa América Femenina': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    'AFC Asian Cup': [24.7136, 46.6753], // Riyadh, Saudi Arabia (Example host)
    'AFC Asian Cup Qualifiers': [24.7136, 46.6753], // Riyadh, Saudi Arabia (Example host)
    'African Nations Championship': [9.0820, 8.6753], // Lagos, Nigeria (Example location)
    'Africa Cup of Nations': [9.0820, 8.6753], // Lagos, Nigeria (Example location)
    'Africa Cup of Nations Qualifying': [9.0820, 8.6753], // Lagos, Nigeria (Example location)
    'FIFA Confederations Cup': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'Scottish League Cup': [-3.1883, 55.9533], // Edinburgh, Scotland
    'Russian Premier League': [37.6173, 55.7558], // Moscow, Russia
    'Belgian Pro League': [4.3517, 50.8503], // Brussels, Belgium
    'Spanish LALIGA 2': [-3.7038, 40.4168], // Madrid, Spain
    'German 2. Bundesliga': [13.4050, 52.5200], // Berlin, Germany
    'Italian Serie B': [12.4964, 41.9028], // Rome, Italy
    'French Ligue 2': [2.3522, 48.8566], // Paris, France
    'Austrian Bundesliga': [16.3738, 48.2082], // Vienna, Austria
    'Greek Super League': [23.7275, 37.9838], // Athens, Greece
    'Swiss Super League': [8.5417, 47.3769], // Zurich, Switzerland
    'Chinese Super League': [116.4074, 39.9042], // Beijing, China
    'International Champions Cup': [-73.935242, 40.730610], // New York, USA (Example location)
    'French Tournoi de France': [2.3522, 48.8566], // Paris, France
    'Arnold Clark Cup': [-0.1276, 51.5074], // London, England
    'Pinatar Cup': [-0.8766, 37.7016], // San Pedro del Pinatar, Spain
    'CONMEBOL Pre-Olympic Tournament': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    "Men's Olympic Qualifying Playoff": [139.6917, 35.6895], // Tokyo, Japan (Example for recent Olympics)
    "Concacaf Women's Olympic Qualifying": [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'FIFA Under-20 World Cup': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    'FIFA Under-17 World Cup': [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    "FIFA Under-17 Women's World Cup": [-58.4173, -34.6118], // Buenos Aires, Argentina (Example host)
    'UEFA European Under-21 Championship': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'UEFA European Under-21 Championship Qualifying': [6.6336, 46.5197], // Zurich, Switzerland (FIFA HQ)
    'Torneio Internacional de Futebol Feminino': [-46.6333, -23.5505], // São Paulo, Brazil
    'Maurice Revello Tournament': [5.3698, 43.2965], // Marseille, France
    'English EFL Trophy': [-0.1276, 51.5074], // London, England
    'English League One': [-0.1276, 51.5074], // London, England
    'English League Two': [-0.1276, 51.5074], // London, England
    'English National League': [-0.1276, 51.5074], // London, England
    'Scottish Championship': [-3.1883, 55.9533], // Edinburgh, Scotland
    'Scottish League One': [-3.1883, 55.9533], // Edinburgh, Scotland
    'Scottish League Two': [-3.1883, 55.9533], // Edinburgh, Scotland
    'Dutch Keuken Kampioen Divisie': [4.9041, 52.3676], // Amsterdam, Netherlands
    'Dutch Tweede Divisie': [4.9041, 52.3676], // Amsterdam, Netherlands
    'Dutch Vrouwen Eredivisie': [4.9041, 52.3676], // Amsterdam, Netherlands
    'Swedish Allsvenskan': [18.0686, 59.3293], // Stockholm, Sweden
    'Danish Superliga': [12.5683, 55.6761], // Copenhagen, Denmark
    'Romanian Liga 1': [26.1025, 44.4268], // Bucharest, Romania
    'Norwegian Eliteserien': [10.7522, 59.9139], // Oslo, Norway
    'Maltese Premier League': [14.5146, 35.8989], // Valletta, Malta
    'Israeli Premier League': [34.7818, 32.0853], // Tel Aviv, Israel
    'Irish Premier Division': [-6.2603, 53.3498], // Dublin, Ireland
    'Welsh Premier League': [-3.1805, 51.4816], // Cardiff, Wales
    'Northern Irish Premiership': [-5.9301, 54.5973], // Belfast, Northern Ireland
    'CONMEBOL Sudamericana': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Liga Profesional de Fútbol': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Copa de la Liga Profesional': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Copa de la Superliga': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Nacional B': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Primera B': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Primera C': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Argentine Primera D': [-58.4173, -34.6118], // Buenos Aires, Argentina
    'Brazilian Serie A': [-46.6333, -23.5505], // São Paulo, Brazil
    'Brazilian Serie B': [-46.6333, -23.5505], // São Paulo, Brazil
    'Brazilian Serie C': [-46.6333, -23.5505], // São Paulo, Brazil
    'Copa do Nordeste': [-38.5108, -12.9714], // Salvador, Brazil
    'AFF Cup': [103.8198, 1.3521], // Singapore (AFF HQ)
    'Brazilian Campeonato Carioca': [-43.1729, -22.9068], // Rio de Janeiro, Brazil
    'Brazilian Campeonato Paulista': [-46.6333, -23.5505], // São Paulo, Brazil
    'Brazilian Campeonato Gaucho': [-51.2300, -30.0277], // Porto Alegre, Brazil
    'Brazilian Campeonato Mineiro': [-43.9378, -19.9167], // Belo Horizonte, Brazil
    'Chilean Primera División': [-70.6483, -33.4569], // Santiago, Chile
    'Segunda División de Chile': [-70.6483, -33.4569], // Santiago, Chile
    'Uruguayan Primera Division': [-56.1882, -34.9011], // Montevideo, Uruguay
    'Segunda División de Uruguay': [-56.1882, -34.9011], // Montevideo, Uruguay
    'Colombian Primera A': [-74.0721, 4.7110], // Bogotá, Colombia
    'Colombian Primera B': [-74.0721, 4.7110], // Bogotá, Colombia
    'Peruvian Liga 1': [-77.0428, -12.0464], // Lima, Peru
    'Paraguayan Primera División': [-57.6359, -25.2637], // Asunción, Paraguay
    'LigaPro Ecuador': [-78.4678, -0.1807], // Quito, Ecuador
    'Ecuador Serie B': [-78.4678, -0.1807], // Quito, Ecuador
    'Venezuelan Primera División': [-66.9036, 10.4806], // Caracas, Venezuela
    'Segunda División de Venezuela': [-66.9036, 10.4806], // Caracas, Venezuela
    'Bolivian Liga Profesional': [-68.1193, -16.5000], // La Paz, Bolivia
    'Japanese J.League': [139.6917, 35.6895], // Tokyo, Japan
    'CONCACAF U23 Tournament': [-77.0369, 38.9072], // Washington D.C., USA (Example location)
    'Honduran Liga Nacional': [-87.2169, 14.0723], // Tegucigalpa, Honduras
    'Costa Rican Primera Division': [-84.0907, 9.9281], // San José, Costa Rica
    'Jamaican Premier League': [-76.7936, 18.1096], // Kingston, Jamaica
    'Guatemalan Liga Nacional': [-90.5069, 14.6349], // Guatemala City, Guatemala
    'Salvadoran Primera Division': [-89.2035, 13.6929], // San Salvador, El Salvador
    'AFC Cup': [51.1657, 25.276987], // Doha, Qatar (Example location)
    'Intercontinental Cup (India)': [77.2090, 28.6139], // New Delhi, India
    'SAFF Championship': [77.2090, 28.6139], // New Delhi, India
    'Indonesian Liga 1': [106.8456, -6.2088], // Jakarta, Indonesia
    'Indian Super League': [72.8777, 19.0760], // Mumbai, India
    'Indian I-League': [72.8777, 19.0760], // Mumbai, India
    'Malaysian Super League': [101.6869, 3.1390], // Kuala Lumpur, Malaysia
    'Singaporean Premier League': [103.8198, 1.3521], // Singapore
    'Thai League 1': [100.5018, 13.7563], // Bangkok, Thailand
    'Bangabandhu Cup': [90.4125, 23.8103], // Dhaka, Bangladesh
    'COSAFA Cup': [25.7461, -28.2293], // Pretoria, South Africa (Example location)
    'CAF Champions League': [31.2357, 30.0444], // Cairo, Egypt (CAF HQ)
    'South African Premier Division Promotion/Relegation Playoffs': [28.0473, -26.2041], // Johannesburg, South Africa
    'CAF Confederation Cup': [31.2357, 30.0444], // Cairo, Egypt (CAF HQ)
    'South African Premier Division': [28.0473, -26.2041], // Johannesburg, South Africa
    'South African First Division': [28.0473, -26.2041], // Johannesburg, South Africa
    'Nigerian Professional League': [7.4969, 9.0579], // Abuja, Nigeria
    'Ghanaian Premier League': [-0.186964, 5.603717], // Accra, Ghana
    'Zambian Super League': [28.3228, -15.3875], // Lusaka, Zambia
    'Ugandan Premier League': [32.5825, 0.3476], // Kampala, Uganda
    'Kenyan Premier League': [36.8219, -1.2921], // Nairobi, Kenya
    'Zimbabwean Premier Soccer League': [31.0456, -17.8292], // Harare, Zimbabwe
};

const divideIntoCoordinateBuckets = (leagues: League[]) => {
    const buckets: { [key: string]: League[] } = {};

    if (!leagues) {
        return [];
    }

    leagues.forEach((league) => {
        const coordinates = leagueCoordinates[league.name];

        if (!coordinates) {
            return;
        }

        const key = coordinates.join(',');

        if (!buckets[key]) {
            buckets[key] = [];
        }

        buckets[key].push(league);
    });

    return buckets;
};

const LeagueMarkerCircle = (props: { coordinates: number[],  onClick: (e?) => void, isSelected: boolean }) => {
    const { coordinates, onClick, isSelected } = props;

    return (
        <Marker coordinates={coordinates}>
            <circle
                r={isSelected ? 10 : 4}
                fill="#a60820"
                stroke="#fff"
                strokeWidth={1}
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            />
        </Marker>
    );
};

const Home = (props: { leagues: League[] }) => {
    const { leagues } = props;

    const [selectedCoordinate, setSelectedCoordinate] = React.useState<string>(null);

    if (!leagues) {
        return null;
    }

    const coordinateBuckets = divideIntoCoordinateBuckets(leagues);

    console.log(coordinateBuckets);

    return (
        <div className="world-map">
            <div onClick={() => setSelectedCoordinate(null)} className='map-container'>
                <ComposableMap>
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />
                            ))
                        }
                    </Geographies>
                    {Object.keys(coordinateBuckets)?.map((coordinateString, index) => {
                        const coordinates = coordinateString.split(',').map(coord => parseFloat(coord));

                        return (
                            <LeagueMarkerCircle
                                key={index}
                                coordinates={coordinates}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCoordinate(coordinateString);
                                }}
                                isSelected={selectedCoordinate === coordinateString}
                            />
                        );
                    })}
                </ComposableMap>
            </div>

            <div className='selected-coordinate-league-list'>
                {selectedCoordinate
                    ? coordinateBuckets[selectedCoordinate].map((league: League, index) => (
                        <div
                            key={index}
                            onClick={() => window.location.href = `/football-rankings/${league.slug}/${getCurrentSeason()}`}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>{league.name}</h3>
                        </div>
                    ))
                    : <h2
                        style={{ fontWeight: 'bold' }}
                    >
                        Click on a circle to see leagues in that location, or scroll down to see all leagues.
                    </h2>
                }
            </div>
        </div>
    );
};



export default Home;




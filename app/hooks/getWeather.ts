export async function getWeather() {
  const url = "https://api.open-meteo.com/v1/gfs?latitude=42.0451&longitude=-87.6877"
    + "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum"
    + "&temperature_unit=fahrenheit&precipitation_unit=inch"
    + "&timezone=America%2FChicago&forecast_days=7";

  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1hr
  const data = await res.json();

  return Response.json(data.daily);
}

const EVANSTON = { lat: 42.0451, lon: -87.6877 };

export interface DailyWeather {
  date: string;
  high: number;
  low: number;
  precipitation: number;
  code: number;
}

export async function getEvanstonWeather(): Promise<DailyWeather[]> {
  const params = new URLSearchParams({
    latitude: String(EVANSTON.lat),
    longitude: String(EVANSTON.lon),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
    timezone: "America/Chicago",
    forecast_days: "7",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/gfs?${params}`, {
    next: { revalidate: 3600 }, // ISR-style cache, refetch at most once/hour
  });

  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.status}`);
  }

  const data = await res.json();
  const { time, weather_code, temperature_2m_max, temperature_2m_min, precipitation_sum } = data.daily;

  return time.map((date: string, i: number) => ({
    date,
    high: temperature_2m_max[i],
    low: temperature_2m_min[i],
    precipitation: precipitation_sum[i],
    code: weather_code[i],
  }));
}

export const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Moderate drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  61: { label: "Slight rain", icon: "🌧️" },
  63: { label: "Moderate rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  71: { label: "Slight snow", icon: "🌨️" },
  73: { label: "Moderate snow", icon: "🌨️" },
  75: { label: "Heavy snow", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Moderate showers", icon: "🌧️" },
  82: { label: "Violent showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

export function getWeatherInfo(code: number) {
  return WMO_CODES[code] ?? { label: "Unknown", icon: "❓" };
}
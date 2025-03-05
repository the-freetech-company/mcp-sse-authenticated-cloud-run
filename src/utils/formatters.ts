import { AlertFeature, ForecastPeriod, AlertsResponse, ForecastResponse } from "../types/weather";

// Format alert data
export const formatAlert = (feature: AlertFeature): string => {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
};

// Format forecast period
export const formatForecastPeriod = (period: ForecastPeriod): string => {
  return [
    `${period.name || "Unknown"}:`,
    `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
    `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
    `${period.shortForecast || "No forecast available"}`,
    "---",
  ].join("\n");
};

// Format alerts response for display
export const formatAlertsResponse = (alertsData: AlertsResponse, stateCode: string): string => {
  const features = alertsData.features || [];
  if (features.length === 0) {
    return `No active alerts for ${stateCode}`;
  }

  const formattedAlerts = features.map(formatAlert);
  return `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;
};

// Format forecast response for display
export const formatForecastResponse = (forecastData: ForecastResponse, latitude: number, longitude: number): string => {
  const periods = forecastData.properties?.periods || [];
  if (periods.length === 0) {
    return "No forecast periods available";
  }

  const formattedForecast = periods.map(formatForecastPeriod);
  return `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;
}; 
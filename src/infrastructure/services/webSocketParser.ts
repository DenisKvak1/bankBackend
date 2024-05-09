export class WebSocketParser {
	parseJson(json: string): {[key: string]: any}{
		return JSON.parse(json)
	}
}
export const webSocketParser = new WebSocketParser()
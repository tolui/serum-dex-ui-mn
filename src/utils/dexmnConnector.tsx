export default class DexMnApi {
  static URL: string = 'https://api.dex.mn/';

  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path);
      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.success ? responseJson.data : null;
      }
    } catch (err) {
      console.log(`Error fetching from dex.mn API ${path}: ${err}`);
    }
    return null;
  }

  static async getRecentTrades(marketAddress: string) {
    return DexMnApi.get(`trades/address/${marketAddress}`);
  }
}

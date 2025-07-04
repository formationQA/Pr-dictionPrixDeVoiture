from src.CreactionJSONObjects import JsonConvert
from src.NettoyageHTML import NettoyageHtml
from src.ScrapperWebSiteObjects import WebScraper


def main():
    instance = WebScraper()
    instancenettoyage = NettoyageHtml()
    instancejson = JsonConvert( )

    instance.ScrapperSiteAnnonces()
    instancenettoyage.TraitementFichiersHTML()
    instancejson.SauvegardeJSON()


if __name__ == "__main__":
    main()

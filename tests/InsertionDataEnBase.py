from src.ConnexionBDD import DatabaseConnection
from src.InsertionDonneesBDD import InsertionDonnees


def main():
    db_connection = DatabaseConnection()
    db_connection.connect()

    data_inserter = InsertionDonnees(db_connection)
    data_inserter.InsererLesDonneesEnBase()

    db_connection.close()


if __name__ == "__main__":
    main()
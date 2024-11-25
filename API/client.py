import mysql.connector

def get_db_connection():
    """Returns a connection to the database."""
    connection = mysql.connector.connect(
        host="127.0.0.1",
        user="paul",
        password="admin",
        database="control_fitxatge",
        charset='utf8mb4',
        collation='utf8mb4_general_ci',
        use_pure=True
    )
    return connection
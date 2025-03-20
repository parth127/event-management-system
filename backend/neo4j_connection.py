from neo4j import GraphDatabase

class Neo4jConnection:
    def __init__(self, uri, user, pwd):
        self.uri = uri
        self.user = user
        self.pwd = pwd
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.pwd))

    def close(self):
        self.driver.close()

    def query(self, query, parameters=None):
        session = self.driver.session()
        result = session.run(query, parameters)
        return result, session

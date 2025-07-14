import { Client, Databases, ID, Query } from "appwrite";
import { configuaration } from "../src/conf/conf.js";
class DatabseServices {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(configuaration.appwriteEndpoint);
    this.client.setProject(configuaration.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async addTrendingTerm({ search_term, image_url, movie_id }) {
    try {
      await this.database.createDocument(
        configuaration.appwriteDatabaseId,
        configuaration.appwriteCollectionId,
        ID.unique(),
        {
          search_term,
          image_url,
          movie_id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateTrendingTerm({ search_term, image_url, movie_id }) {
    try {
      const document = await this.database.listDocuments(
        configuaration.appwriteDatabaseId,
        configuaration.appwriteCollectionId,
        [Query.equal("search_term", search_term)]
      );

      //if not present add the search_term
      if (document.total === 0) {
        await this.addTrendingTerm({ search_term, image_url, movie_id });
      }

      //if already present then increment the count
      if (document.total > 0) {
        await this.database.updateDocument(
          configuaration.appwriteDatabaseId,
          configuaration.appwriteCollectionId,
          document.documents[0].$id,
          {
            count: document.documents[0].count + 1,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTrendingMovies() {
    try {
      const documents = await this.database.listDocuments(
        configuaration.appwriteDatabaseId,
        configuaration.appwriteCollectionId,
        [Query.limit(6), Query.orderDesc("count")]
      );

      return documents.documents;
    } catch (error) {
      console.log(error);
    }
  }
}

const databseServices = new DatabseServices();
export { databseServices };

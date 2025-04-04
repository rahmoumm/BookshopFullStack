package BookShop.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BookShopApplication {

	public static void main(String[] args) {

//		Dotenv dotenv = Dotenv.configure().directory("./bookshop_backend/demo/").load();
//
//		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
//		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
//		System.setProperty("DB_LINK", dotenv.get("DB_LINK"));
//
//		SpringApplication.run(BookShopApplication.class, args);

		boolean isRender = System.getenv("RENDER") != null;

		if (!isRender) {
			// Mode local : charger les variables depuis .env
			Dotenv dotenv = Dotenv.configure().load();
			System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
			System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
			System.setProperty("DB_LINK", dotenv.get("DB_LINK"));

			System.out.println("🔹 Mode Local : Variables chargées depuis .env");
		} else {
			// Mode Render : utiliser les variables d'environnement système
			System.out.println("🚀 Mode Render : Variables chargées depuis System.getenv()");
		}

		// Démarrer Spring Boot
		SpringApplication.run(BookShopApplication.class, args);
	}

}

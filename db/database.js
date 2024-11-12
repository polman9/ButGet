import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("finances.db");

// Function to initialize the database and create tables
export const initializeDatabase = async () => {
  db.transactionAsync(
    (tx) => {
      // Create Categories table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );`,
        [],
        () => console.log("Categories table created"),
        (_, error) => console.error("Error creating categories table", error)
      );

      // Create Subcategories table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS subcategories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          category_id INTEGER,
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );`,
        [],
        () => console.log("Subcategories table created"),
        (_, error) => console.error("Error creating subcategories table", error)
      );

      // Create Transactions table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subcategory_id INTEGER,
          name TEXT,
          amount REAL NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          notes TEXT,
          FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
        );`,
        [],
        () => console.log("Transactions table created"),
        (_, error) => console.error("Error creating transactions table", error)
      );
    },
    null,
    // Populate initial categories and subcategories if needed
    initializeCategoriesAndSubcategories
  );
};

// Function to populate categories and subcategories
const initializeCategoriesAndSubcategories = () => {
  const categories = [
    { name: "Daily" },
    { name: "Regular Expenses" },
    { name: "Additional Expenses" },
  ];

  const subcategories = [
    { name: "Groceries", category: "Daily" },
    { name: "Restaurants", category: "Daily" },
    { name: "Transport", category: "Daily" },
    { name: "Flat", category: "Regular Expenses" },
    { name: "Subscriptions", category: "Regular Expenses" },
    { name: "Services", category: "Regular Expenses" },
    { name: "Other", category: "Regular Expenses" },
    { name: "Dog", category: "Additional Expenses" },
    { name: "Purchases", category: "Additional Expenses" },
    { name: "Events", category: "Additional Expenses" },
  ];

  // Insert categories
  db.transaction((tx) => {
    categories.forEach((cat) => {
      tx.executeSql(
        "INSERT OR IGNORE INTO categories (name) VALUES (?);",
        [cat.name],
        () => console.log(`Category ${cat.name} inserted`),
        (_, error) =>
          console.error(`Error inserting category ${cat.name}`, error)
      );
    });
  });

  // Insert subcategories with category IDs
  db.transaction((tx) => {
    subcategories.forEach((subcat) => {
      tx.executeSql(
        `INSERT OR IGNORE INTO subcategories (name, category_id) 
         SELECT ?, id FROM categories WHERE name = ?;`,
        [subcat.name, subcat.category],
        () =>
          console.log(
            `Subcategory ${subcat.name} for category ${subcat.category} inserted`
          ),
        (_, error) =>
          console.error(`Error inserting subcategory ${subcat.name}`, error)
      );
    });
  });
};

export default db;

import csvParse from "csv-parse";
import fs from "fs";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse({
        delimiter: ";",
      });

      const categories: IImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories: IImportCategory[] = await this.loadCategory(file);
    console.log(categories);
    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadExists) {
        const category: ICreateCategoryDTO = { name, description };
        this.categoriesRepository.create(category);
      }
    });
  }
}

export { ImportCategoryUseCase };

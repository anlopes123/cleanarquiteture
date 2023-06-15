import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {
    private productRepository : ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto) : Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(productsIn: Product[]): OutputListProductDto {
        return {
            products : productsIn.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}
import "reflect-metadata";
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
// import useCases
import { GetPokemonsUseCase } from "./app/modules/Pokedex/useCases/getPokemonsUseCase";
// Repositories useCases
import PokemonRepository from "./app/modules/Pokedex/domain/PokemonRepository";
// Services
// import PokemonService from "@/app/modules/Pokedex/infrastructure/memoryPokemonService";
import PokemonService from "./app/modules/Pokedex/infrastructure/httpPokemonService";
// HTTP
import { IHttp } from "./app/network/domain/interface/IHttp";
import Http from "./app/network/domain/Http";

const container = new Container();

container.bind<IHttp>("Http").to(Http);

container.bind<PokemonRepository>("PokemonRepository").to(PokemonService);

container.bind<GetPokemonsUseCase>("GetPokemonsUseCase").to(GetPokemonsUseCase);

const { lazyInject } = getDecorators(container);
export { lazyInject, container };

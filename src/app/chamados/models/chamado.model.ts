export const CATEGORIAS_CHAMADO = ['Hardware', 'Software', 'Rede', 'Acesso'] as const;

export type CategoriaChamado = (typeof CATEGORIAS_CHAMADO)[number];

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  categoria: CategoriaChamado;
}

export interface CriarChamadoInput {
  titulo: string;
  descricao: string;
  categoria: CategoriaChamado;
}

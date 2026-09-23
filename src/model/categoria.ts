export type Categoria = {
  id: string;
  nome: string;
  corBorda: string;
  corSeta: string;
  imagem: any;
};

export type Produto = {
  id: string;
  categoriaId: string;
  categoriaNome: string;
  nome: string;
  preco: number;
  descricao: string;
  proteinas: string;
  carboidratos: string;
  gorduras: string;
  imagem: any;
  imagemGrande: any;
};
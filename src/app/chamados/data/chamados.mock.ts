import { CATEGORIAS_CHAMADO, CategoriaChamado, Chamado } from '../models/chamado.model';

export interface CategoriaChamadoOption {
  label: CategoriaChamado;
  value: CategoriaChamado;
  descricao: string;
}

export const CATEGORIAS_CHAMADO_OPTIONS: CategoriaChamadoOption[] = [
  {
    label: CATEGORIAS_CHAMADO[0],
    value: CATEGORIAS_CHAMADO[0],
    descricao: 'Manutenção de equipamentos e periféricos.'
  },
  {
    label: CATEGORIAS_CHAMADO[1],
    value: CATEGORIAS_CHAMADO[1],
    descricao: 'Falhas em sistemas, aplicações e atualizações.'
  },
  {
    label: CATEGORIAS_CHAMADO[2],
    value: CATEGORIAS_CHAMADO[2],
    descricao: 'Conectividade, VPN, Wi-Fi e infraestrutura de rede.'
  },
  {
    label: CATEGORIAS_CHAMADO[3],
    value: CATEGORIAS_CHAMADO[3],
    descricao: 'Perfis, permissões e autenticação corporativa.'
  }
];

export const CHAMADOS_INICIAIS: Chamado[] = [
  {
    id: 1048,
    titulo: 'Notebook sem conexão com a VPN',
    descricao: 'Colaborador do financeiro não consegue acessar o ambiente interno ao trabalhar remotamente.',
    categoria: 'Rede'
  },
  {
    id: 1043,
    titulo: 'Instalação do pacote Office para nova analista',
    descricao: 'Máquina recém-formatada precisa do pacote de produtividade e dos atalhos corporativos.',
    categoria: 'Software'
  },
  {
    id: 1039,
    titulo: 'Reset de senha do portal de compras',
    descricao: 'Usuária bloqueada após tentativas de login e sem acesso ao e-mail de recuperação.',
    categoria: 'Acesso'
  },
  {
    id: 1034,
    titulo: 'Substituição de headset com falha no microfone',
    descricao: 'Equipamento do time de atendimento apresenta ruído constante durante chamadas com clientes.',
    categoria: 'Hardware'
  }
];

const courseQuestions = {
  modules: {
    1: {
      objective: [
        {
          id: 'm1-q1',
          question: 'Qual alternativa melhor descreve um processo, segundo o material das aulas de Sistemas Distribuídos?',
          options: [
            { key: 'A', text: 'Um processo é apenas um código-fonte armazenado em disco.' },
            { key: 'B', text: 'Um processo é um programa em execução com contador de instruções, pilha e seção de dados.' },
            { key: 'C', text: 'Um processo é um conjunto de arquivos abertos sem estado de execução.' },
            { key: 'D', text: 'Um processo é um tipo de escalonador do sistema operacional.' },
            { key: 'E', text: 'Um processo é uma fila de pronto do kernel.' }
          ],
          answer: 'B',
          explanation: 'No material, processo é tratado como programa em execução, com informações como contador de instruções, pilha e seção de dados.'
        },
        {
          id: 'm1-q2',
          question: 'O que caracteriza a condição de corrida (race condition)?',
          options: [
            { key: 'A', text: 'Quando um processo não consegue iniciar porque a fila de pronto está vazia.' },
            { key: 'B', text: 'Quando múltiplos processos acessam um mesmo dado compartilhado sem sincronização adequada e o resultado depende da ordem de execução.' },
            { key: 'C', text: 'Quando um processo tenta ler dados de disco sem permissão.' },
            { key: 'D', text: 'Quando o escalonador gera um intervalo de tempo muito longo.' },
            { key: 'E', text: 'Quando há concorrência entre threads e não existe fila de dispositivos.' }
          ],
          answer: 'B',
          explanation: 'A race condition ocorre quando vários processos leem e escrevem um mesmo recurso compartilhado sem sincronização, tornando o resultado dependente da ordem de execução.'
        },
        {
          id: 'm1-q3',
          question: 'Qual é a função principal do mutex na sincronização de processos?',
          options: [
            { key: 'A', text: 'Garantir que o processo execute sem interrupções do escalonador.' },
            { key: 'B', text: 'Permitir a troca de contexto entre processos.' },
            { key: 'C', text: 'Controlar o acesso exclusivo à região crítica, evitando acessos simultâneos inconsistentes.' },
            { key: 'D', text: 'Organizar a fila de dispositivos de E/S.' },
            { key: 'E', text: 'Aumentar a prioridade de um processo em execução.' }
          ],
          answer: 'C',
          explanation: 'O mutex implementa exclusão mútua para proteger a região crítica e evitar inconsistências causadas por acessos concorrentes.'
        }
      ],
      discursive: [
        {
          id: 'm1-d1',
          prompt: 'Explique por que a região crítica precisa de mutex e como esse mecanismo evita a condição de corrida.',
          criteria: [
            'região crítica',
            'recurso compartilhado',
            'acesso simultâneo',
            'mutex',
            'exclusão mútua',
            'race condition'
          ],
          expected: 'A resposta deve explicar que a região crítica é o trecho do código em que há acesso a um recurso compartilhado e que, sem sincronização, vários processos podem entrar ao mesmo tempo. O mutex garante exclusão mútua, permitindo que apenas um processo execute esse trecho por vez. Assim, os dados compartilhados não sofrem escrita concorrente, evitando a race condition e preservando a consistência das informações.'
        }
      ]
    },
    2: {
      objective: [
        {
          id: 'm2-q1',
          question: 'Qual opção melhor define um Sistema Distribuído?',
          options: [
            { key: 'A', text: 'Um conjunto de computadores independentes conectados em rede que aparece como um sistema único e coerente.' },
            { key: 'B', text: 'Um único computador com vários usuários acessando a mesma memória.' },
            { key: 'C', text: 'Um sistema operacional sem rede e sem comunicação entre processos.' },
            { key: 'D', text: 'Um grupo de processos executando apenas em uma máquina local.' },
            { key: 'E', text: 'Uma fila de mensagens que substitui qualquer camada de software.' }
          ],
          answer: 'A',
          explanation: 'O texto do material define SD como uma coleção de computadores independentes conectados que se apresenta ao usuário como um sistema único e coerente.'
        },
        {
          id: 'm2-q2',
          question: 'Qual é a função principal do middleware em um sistema distribuído?',
          options: [
            { key: 'A', text: 'Executar diretamente o escalonamento de processos no hardware.' },
            { key: 'B', text: 'Oferecer abstração de rede, heterogeneidade e facilidades de comunicação para as aplicações.' },
            { key: 'C', text: 'Substituir totalmente o sistema operacional.' },
            { key: 'D', text: 'Garantir o armazenamento permanente dos dados em memória principal.' },
            { key: 'E', text: 'Controlar fila de espera de usuários em um terminal.' }
          ],
          answer: 'B',
          explanation: 'O middleware fica entre o SO e a aplicação para oferecer transparência, abstração de rede e serviços de comunicação distribuída.'
        },
        {
          id: 'm2-q3',
          question: 'No modelo RPC, qual papel do stub?',
          options: [
            { key: 'A', text: 'Gerenciar o estado de processos em espera no kernel.' },
            { key: 'B', text: 'Controlar a fila de dispositivos de entrada e saída.' },
            { key: 'C', text: 'Converter argumentos em uma estrutura serializada para envio e interpretar a resposta do servidor.' },
            { key: 'D', text: 'Executar o código no cliente sem uso do middleware.' },
            { key: 'E', text: 'Trocar dados apenas em memória compartilhada local.' }
          ],
          answer: 'C',
          explanation: 'O stub encapsula a preparação e interpretação da chamada remota: converte argumentos para comunicação e desempacota a resposta do servidor.'
        }
      ],
      discursive: [
        {
          id: 'm2-d1',
          prompt: 'Descreva a função do middleware e explique como o RPC permite a execução remota de uma rotina.',
          criteria: [
            'middleware',
            'abstração de rede',
            'heterogeneidade',
            'RPC',
            'stub',
            'servidor'
          ],
          expected: 'A resposta deve apontar que o middleware atua como camada entre o sistema operacional e a aplicação, ocultando detalhes de rede, heterogeneidade e comunicação. Em RPC, o cliente chama uma rotina como se fosse local, mas o stub converte os argumentos e envia a mensagem. O middleware faz a serialização e a transmissão. No servidor, o stub recebe a mensagem, desempacota os dados e invoca a rotina real; o resultado retorna pelo mesmo caminho.'
        }
      ]
    },
    3: {
      objective: [
        {
          id: 'm3-q1',
          question: 'Qual propriedade do conjunto ACID garante que uma transação seja executada por completo ou seja totalmente descartada?',
          options: [
            { key: 'A', text: 'Consistência' },
            { key: 'B', text: 'Atomicidade' },
            { key: 'C', text: 'Isolamento' },
            { key: 'D', text: 'Transparência' },
            { key: 'E', text: 'Escalabilidade' }
          ],
          answer: 'B',
          explanation: 'Atomicidade é a regra do “tudo ou nada”: a transação deve ser aplicada por completo ou revertida totalmente.'
        },
        {
          id: 'm3-q2',
          question: 'Em uma rede P2P estruturada, qual mecanismo é mais comum para localizar recursos?',
          options: [
            { key: 'A', text: 'Fila de dispositivos' },
            { key: 'B', text: 'Memória compartilhada' },
            { key: 'C', text: 'DHT (Distributed Hash Table)' },
            { key: 'D', text: 'Escalonador circular' },
            { key: 'E', text: 'Semáforo global' }
          ],
          answer: 'C',
          explanation: 'As redes P2P estruturadas normalmente usam DHT para mapear chaves de recursos em nós da rede, permitindo busca organizada.'
        },
        {
          id: 'm3-q3',
          question: 'Qual diferença é correta entre arquitetura centralizada e descentralizada?',
          options: [
            { key: 'A', text: 'A centralizada elimina totalmente a comunicação entre nós; a descentralizada cria um único servidor central.' },
            { key: 'B', text: 'A centralizada concentra funções em servidores, enquanto a descentralizada distribui responsabilidades entre os pares da rede.' },
            { key: 'C', text: 'A centralizada exige DHT; a descentralizada exige apenas mutex.' },
            { key: 'D', text: 'A centralizada é sempre feita em uma camada de dados; a descentralizada nunca usa arquitetura em camadas.' },
            { key: 'E', text: 'Não há diferença conceitual entre as duas.' }
          ],
          answer: 'B',
          explanation: 'A arquitetura centralizada separa clientes e servidores com foco em servidores dedicados, enquanto a descentralizada distribui as funções entre os nós.'
        }
      ],
      discursive: [
        {
          id: 'm3-d1',
          prompt: 'Explique como as propriedades ACID e a arquitetura P2P estruturada contribuem para consistência, disponibilidade e localização de recursos.',
          criteria: [
            'ACID',
            'atomicidade',
            'consistência',
            'isolamento',
            'durabilidade',
            'P2P',
            'DHT'
          ],
          expected: 'A resposta deve definir ACID e relacionar cada propriedade à integridade da transação: atomicidade para evitar resultados parciais, consistência para manter regras válidas, isolamento para não misturar efeitos de transações concorrentes, e durabilidade para preservar alterações confirmadas. Em P2P estruturado, a DHT organiza a chave do recurso e o nó correspondente, permitindo que a busca e o acesso sejam eficientes e previsíveis. Assim, a infraestrutura ajuda a localizar dados e mantê-los consistentes no ambiente distribuído.'
        }
      ]
    },
    4: {
      objective: [
        {
          id: 'm4-q1',
          question: 'O que significa montar um diretório remoto em um sistema Unix?',
          options: [
            { key: 'A', text: 'Copiar todo o conteúdo do diretório para a memória principal.' },
            { key: 'B', text: 'Conectar um diretório remoto a um ponto específico da árvore de arquivos local, como se fosse local.' },
            { key: 'C', text: 'Transferir dados por memória compartilhada.' },
            { key: 'D', text: 'Desativar todos os mecanismos de cache do cliente.' },
            { key: 'E', text: 'Substituir necessidade de autenticação por transparência de rede.' }
          ],
          answer: 'B',
          explanation: 'O material explica que um diretório remoto é montado em um ponto específico da árvore local, ocultando a distribuição para o usuário.'
        },
        {
          id: 'm4-q2',
          question: 'Qual é um dos cinco pilares fundamentais de um DFS?',
          options: [
            { key: 'A', text: 'Troca de contexto obrigatória em cada arquivo' },
            { key: 'B', text: 'Escalabilidade' },
            { key: 'C', text: 'Exclusão mútua em todos os diretórios' },
            { key: 'D', text: 'Troca de mensagens em memória compartilhada' },
            { key: 'E', text: 'Generação automática de processos para leitura' }
          ],
          answer: 'B',
          explanation: 'Os cinco pilares do DFS incluem transparência, escalabilidade, segurança, tolerância a falhas e consistência.'
        },
        {
          id: 'm4-q3',
          question: 'Qual é a importância da idempotência em um sistema de arquivos distribuído?',
          options: [
            { key: 'A', text: 'Permite que uma requisição repetida produza o mesmo resultado sem corromper dados.' },
            { key: 'B', text: 'Inibe qualquer operação de escrita em disco remoto.' },
            { key: 'C', text: 'Substitui a necessidade de cache no cliente.' },
            { key: 'D', text: 'Garante a criação de um novo processo em cada execução.' },
            { key: 'E', text: 'Elimina totalmente a necessidade de autenticação.' }
          ],
          answer: 'A',
          explanation: 'Requisições idempotentes podem ser repetidas sem causar efeitos colaterais indesejados, o que é importante em falhas e retransmissões.'
        }
      ],
      discursive: [
        {
          id: 'm4-d1',
          prompt: 'Descreva os cinco pilares fundamentais de um sistema de arquivos distribuído e explique por que consistência e tolerância a falhas são essenciais.',
          criteria: [
            'transparência',
            'escalabilidade',
            'segurança',
            'tolerância a falhas',
            'consistência',
            'idempotência'
          ],
          expected: 'A resposta deve mencionar transparência de nomeação e localização, escalabilidade para expansão do sistema, segurança distribuída para autenticação e controle de acesso, tolerância a falhas para manter o serviço mesmo com falhas de nós ou rede, e consistência para coordenar acesso concorrente. A idempotência também deve aparecer como característica relevante para repetir requisições sem corrupta os dados. Esses pilares tornam o DFS confiável e acessível como se o arquivo estivesse em um disco local.'
        }
      ]
    }
  },
  finalExam: {
    objective: [
      {
        id: 'final-q1',
        question: 'Qual estrutura do SO mantém informações do processo, como PID, estado e contador de instruções?',
        options: [
          { key: 'A', text: 'PCB' },
          { key: 'B', text: 'DHT' },
          { key: 'C', text: 'IDL' },
          { key: 'D', text: 'NFS' },
          { key: 'E', text: 'Middleware' }
        ],
        answer: 'A',
        explanation: 'O PCB (Process Control Block) armazena informações essenciais de gerenciamento do processo.'
      },
      {
        id: 'final-q2',
        question: 'Qual alternativa descreve corretamente a relação entre middleware e transparência em sistemas distribuídos?',
        options: [
          { key: 'A', text: 'Middleware reduz a necessidade de rede e elimina a heterogeneidade.' },
          { key: 'B', text: 'Middleware oferece abstrações de rede e serviços de comunicação para que a aplicação veja o sistema como único e coerente.' },
          { key: 'C', text: 'Middleware substitui o banco de dados do servidor.' },
          { key: 'D', text: 'Middleware é responsável por fila de job e escalonamento da CPU.' },
          { key: 'E', text: 'Middleware apenas registra logs e não participa da comunicação.' }
        ],
        answer: 'B',
        explanation: 'O middleware cria uma camada lógica de abstração para ocultar detalhes de rede, heterogeneidade e comunicação entre aplicações.'
      },
      {
        id: 'final-q3',
        question: 'O que a propriedade durabilidade da ACID garante?',
        options: [
          { key: 'A', text: 'Que a transação é executada em paralelo com outras.' },
          { key: 'B', text: 'Que os dados persistem após o commit mesmo em caso de falha.' },
          { key: 'C', text: 'Que a transação nunca bloqueia outros processos.' },
          { key: 'D', text: 'Que a transação apenas consulta dados sem escrever.' },
          { key: 'E', text: 'Que os recursos ficam em memória compartilhada.' }
        ],
        answer: 'B',
        explanation: 'Durabilidade significa que uma transação confirmada persiste mesmo após falha do sistema.'
      },
      {
        id: 'final-q4',
        question: 'Qual conceito é fundamental nas redes P2P estruturadas para localizar recursos?',
        options: [
          { key: 'A', text: 'Região crítica' },
          { key: 'B', text: 'DHT' },
          { key: 'C', text: 'PCB' },
          { key: 'D', text: 'Escalonador' },
          { key: 'E', text: 'Memória virtual' }
        ],
        answer: 'B',
        explanation: 'A DHT é a base da organização estruturada em P2P, permitindo mapear recursos e nós por chaves distribuídas.'
      },
      {
        id: 'final-q5',
        question: 'Qual é a principal vantagem de montar um diretório remoto em um ponto da árvore local de arquivos?',
        options: [
          { key: 'A', text: 'Permitir que o usuário acesse o recurso remoto como se fosse local, sem precisar conhecer sua localização física.' },
          { key: 'B', text: 'Reduzir a necessidade de autenticação no servidor.' },
          { key: 'C', text: 'Substituir a necessidade de consistência do sistema.' },
          { key: 'D', text: 'Remover a camada de rede do sistema distribuído.' },
          { key: 'E', text: 'Evitar qualquer falha de um único nó.' }
        ],
        answer: 'A',
        explanation: 'A montagem local cria transparência para o usuário, que passa a acessar o recurso remoto como se estivesse no sistema de arquivos local.'
      }
    ],
    discursive: [
      {
        id: 'final-d1',
        prompt: 'Explique a diferença entre processo e comunicação entre processos, destacando a necessidade de sincronização em regiões críticas e o papel do middleware em um sistema distribuído.',
        criteria: [
          'processo',
          'comunicação entre processos',
          'IPC',
          'região crítica',
          'mutex',
          'middleware'
        ],
        expected: 'A resposta deve diferenciar processo como programa em execução e IPC como mecanismo de troca de informação entre processos. Ela deve mencionar que, quando dois processos acessam um recurso compartilhado, o trecho do código que modifica o recurso é a região crítica e precisa de sincronização. O mutex garante exclusão mútua para evitar race condition. O middleware, por sua vez, oferece abstração e comunicação distribuída, ocultando detalhes de rede e heterogeneidade para a aplicação.'
      }
    ]
  }
};

window.courseQuestions = courseQuestions;

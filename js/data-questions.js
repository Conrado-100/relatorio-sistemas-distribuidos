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
    },
    5: {
      objective: [
        {
          id: 'm5-q1',
          question: 'Qual definição melhor expressa o conceito de tolerância a falhas em um sistema distribuído?',
          options: [
            { key: 'A', text: 'Capacidade de aumentar o número de mensagens trocadas entre processos sem afetar a execução.' },
            { key: 'B', text: 'Capacidade de manter o funcionamento correto mesmo após falhas em parte de seus componentes físicos ou de software.' },
            { key: 'C', text: 'Capacidade de substituir um relógio global por um relógio local em todos os nós.' },
            { key: 'D', text: 'Capacidade de impedir que duas réplicas executem a mesma operação ao mesmo tempo.' },
            { key: 'E', text: 'Capacidade de ocultar todas as falhas de rede pela transmissão de mensagens sem confirmação.' }
          ],
          answer: 'B',
          explanation: 'A tolerância a falhas é a capacidade do sistema manter seu funcionamento correto mesmo quando parte de seus componentes falha.',
          concept: 'Fault Tolerance'
        },
        {
          id: 'm5-q2',
          question: 'Qual modelo de falha é caracterizado por um nó que para de responder definitivamente e deixa de participar do sistema?',
          options: [
            { key: 'A', text: 'Crash-Recovery' },
            { key: 'B', text: 'Crash-Stop' },
            { key: 'C', text: 'Byzantine Fault' },
            { key: 'D', text: 'Virtual Synchrony' },
            { key: 'E', text: 'Total Order Multicast' }
          ],
          answer: 'B',
          explanation: 'No Crash-Stop, o nó deixa de responder e passa a não participar mais do sistema de forma definitiva.',
          concept: 'Crash-Stop'
        },
        {
          id: 'm5-q3',
          question: 'Qual alternativa descreve corretamente a falha bizantina?',
          options: [
            { key: 'A', text: 'O nó falha e reinicia automaticamente sem perder o estado.' },
            { key: 'B', text: 'O nó deixa de responder e não pode mais recuperar.' },
            { key: 'C', text: 'O nó pode agir de maneira arbitrária, enviar informações falsas ou contraditórias e comprometer o consenso.' },
            { key: 'D', text: 'O nó apenas atrasa mensagens sem enviar conteúdo incorreto.' },
            { key: 'E', text: 'O nó bloqueia o sistema somente quando o quorum não é alcançado.' }
          ],
          answer: 'C',
          explanation: 'A falha bizantina é a mais grave, porque o nó pode se comportar de modo arbitrário, malicioso ou inconsistente.',
          concept: 'Byzantine Fault'
        },
        {
          id: 'm5-q4',
          question: 'Qual afirmação melhor diferencia Availability de Reliability?',
          options: [
            { key: 'A', text: 'Availability mede a probabilidade de o sistema funcionar sem falhas contínuas; Reliability mede o tempo em que o sistema está disponível.' },
            { key: 'B', text: 'Availability mede o percentual de tempo em que o sistema está disponível; Reliability mede a probabilidade de o sistema funcionar sem falha contínua durante um intervalo.' },
            { key: 'C', text: 'Availability e Reliability são sinônimos usados em sistemas distribuídos.' },
            { key: 'D', text: 'Availability considera apenas falhas de rede; Reliability considera apenas falhas locais.' },
            { key: 'E', text: 'Availability depende exclusivamente de quorum; Reliability depende apenas de Paxos.' }
          ],
          answer: 'B',
          explanation: 'Availability mede disponibilidade operacional, enquanto Reliability mede probabilidade de operação sem falha contínua ao longo de tempo.',
          concept: 'Reliability vs Availability'
        },
        {
          id: 'm5-q5',
          question: 'No modelo de replicação passiva (Primary-Backup), qual característica é correta?',
          options: [
            { key: 'A', text: 'Todos os nós executam a requisição e propagam o resultado ao cliente.' },
            { key: 'B', text: 'Apenas o Primary executa a requisição e os Backups mantêm cópias atualizadas do estado.' },
            { key: 'C', text: 'Os backups são responsáveis por ordenar mensagens para o Primary.' },
            { key: 'D', text: 'O cliente somente envia a requisição para os backups e não para o primary.' },
            { key: 'E', text: 'O State Machine é descartado a cada failover.' }
          ],
          answer: 'B',
          explanation: 'Na replicação passiva, o Primary executa a requisição e os Backups mantêm cópias do estado atualizadas por propagação das alterações.',
          concept: 'Primary-Backup Replication'
        },
        {
          id: 'm5-q6',
          question: 'Qual é a principal diferença entre replicação passiva e replicação ativa?',
          options: [
            { key: 'A', text: 'Na passiva, todos os nós executam a operação; na ativa, apenas o Primary executa.' },
            { key: 'B', text: 'Na ativa, todas as réplicas recebem a requisição e executam a operação; na passiva, apenas o Primary executa a requisição.' },
            { key: 'C', text: 'Na ativa, os backups não mantêm o estado; na passiva, todos precisam manter o mesmo log.' },
            { key: 'D', text: 'Na passiva, é obrigatório usar Paxos; na ativa, não é necessário.' },
            { key: 'E', text: 'Nenhuma diferença prática: ambos usam a mesma abordagem.' }
          ],
          answer: 'B',
          explanation: 'A diferença essencial é que na replicação ativa todas as réplicas executam a operação, enquanto na passiva apenas o Primary executa e propagação pelo estado é feita para backups.',
          concept: 'Active vs Passive Replication'
        },
        {
          id: 'm5-q7',
          question: 'Qual é o objetivo principal do consenso distribuído?',
          options: [
            { key: 'A', text: 'Permitir que um cliente gere o menor número possível de mensagens.' },
            { key: 'B', text: 'Garantir que vários processos concordem sobre um valor ou sequência de ações mesmo diante de falhas.' },
            { key: 'C', text: 'Reduzir o uso de memória para as réplicas em sistemas ativos.' },
            { key: 'D', text: 'Eliminar a necessidade de ordem de mensagens em logs locais.' },
            { key: 'E', text: 'Forçar todos os processos a executar o mesmo código sem comunicação.' }
          ],
          answer: 'B',
          explanation: 'O consenso distribui a decisão entre processos e garante que eles converjam para um valor ou sequência de ações mesmo com falhas.',
          concept: 'Consensus'
        },
        {
          id: 'm5-q8',
          question: 'Para tolerar f falhas do tipo Crash-Stop, qual fórmula de quórum é correta?',
          options: [
            { key: 'A', text: 'N = f + 1' },
            { key: 'B', text: 'N = 2f + 1' },
            { key: 'C', text: 'N = 3f + 1' },
            { key: 'D', text: 'N = 2f' },
            { key: 'E', text: 'N = f + 2' }
          ],
          answer: 'B',
          explanation: 'Para Crash-Stop, a regra é N = 2f + 1, sendo necessário um número mínimo de nós para tolerar f falhas.',
          concept: 'Quorum para Crash-Stop'
        },
        {
          id: 'm5-q9',
          question: 'Para tolerar f falhas bizantinas, quantos nós são necessários no mínimo?',
          options: [
            { key: 'A', text: '2f + 1' },
            { key: 'B', text: '3f' },
            { key: 'C', text: '3f + 1' },
            { key: 'D', text: 'f + 3' },
            { key: 'E', text: 'f + 1' }
          ],
          answer: 'C',
          explanation: 'A regra para falhas bizantinas é N = 3f + 1, pois o sistema precisa lidar com participantes que podem agir de forma arbitrária.',
          concept: 'Quorum para falhas bizantinas'
        },
        {
          id: 'm5-q10',
          question: 'Por que o problema dos Generais Bizantinos é mais difícil de resolver do que falhas do tipo Crash-Stop?',
          options: [
            { key: 'A', text: 'Porque o problema elimina a necessidade de comunicação entre grupos.' },
            { key: 'B', text: 'Porque o processo defeituoso não apenas para, mas pode mentir, enviar informações contraditórias e agir de forma arbitrária.' },
            { key: 'C', text: 'Porque o problema exige que todos os processos usem a mesma frequência de CPU.' },
            { key: 'D', text: 'Porque o problema permite que mensagens sejam esquecidas sem prejudicar a decisão.' },
            { key: 'E', text: 'Porque ele considera apenas a latência da rede e não a lógica do consenso.' }
          ],
          answer: 'B',
          explanation: 'Falhas bizantinas são mais desafiadoras porque o processo defeituoso pode agir de maneira maliciosa e inconsistente, não apenas deixar de responder.',
          concept: 'Problema dos Generais Bizantinos'
        },
        {
          id: 'm5-q11',
          question: 'Qual é o papel principal da Sincronia Virtual (Virtual Synchrony) em uma comunicação em grupo?',
          options: [
            { key: 'A', text: 'Garantir que um novo nó sempre execute em modo stand-alone sem depende de outros.' },
            { key: 'B', text: 'Manter uma visão consistente sobre mudanças de membros e entrega de mensagens em um grupo.' },
            { key: 'C', text: 'Substituir a eleição de líder em protocolos de consenso.' },
            { key: 'D', text: 'Proibir qualquer tipo de falha em membros do grupo.' },
            { key: 'E', text: 'Remover a necessidade de quorum em qualquer decisão.' }
          ],
          answer: 'B',
          explanation: 'A Virtual Synchrony mantém visão consistente de membros e coordena a entrega de mensagens para que o grupo continue coerente mesmo diante de falhas.',
          concept: 'Virtual Synchrony / Group Communication'
        },
        {
          id: 'm5-q12',
          question: 'Qual característica é mais diretamente associada a Group Communication e Total Order Multicast?',
          options: [
            { key: 'A', text: 'A comunicação é feita em ordem aleatória para reduzir overhead.' },
            { key: 'B', text: 'Todas as mensagens devem ser entregues na mesma ordem para todos os membros do grupo.' },
            { key: 'C', text: 'O grupo ignora quorum e aceita qualquer decisão local.' },
            { key: 'D', text: 'A comunicação em grupo exige apenas uma réplica passiva para funcionar.' },
            { key: 'E', text: 'Total Order Multicast elimina qualquer necessidade de consenso.' }
          ],
          answer: 'B',
          explanation: 'Em Group Communication, a ordenação total das mensagens é importante para que todos os participantes processem a mesma sequência de eventos.',
          concept: 'Group Communication / Total Order Multicast'
        }
      ]
    }
  },
  finalExam: {
    objective: [
      {
        id: 'final-q1',
        difficulty: 'Fácil',
        theme: 'Sistemas de Arquivos de Rede vs. Sistemas de Arquivos Distribuídos',
        question: 'Em relação ao armazenamento de arquivos em ambientes de rede, qual é a principal diferença entre um Sistema de Arquivos de Rede e um Sistema de Arquivos Distribuído, segundo o material da disciplina?',
        options: [
          { key: 'A', text: 'No Sistema de Arquivos de Rede, os arquivos ficam espalhados em vários servidores e o usuário os acessa como se fossem locais; no Distribuído, o arquivo é mantido em um único servidor fixo.' },
          { key: 'B', text: 'No Sistema de Arquivos de Rede, o usuário precisa conhecer o nome do servidor em que o arquivo está localizado; no Sistema de Arquivos Distribuído, os arquivos estão espalhados por vários servidores e são acessados pelo usuário como se fossem locais.' },
          { key: 'C', text: 'O Sistema de Arquivos de Rede proíbe o uso do comando de montagem em ambiente Unix, enquanto o Distribuído exige obrigatoriamente um banco de dados centralizado de permissões.' },
          { key: 'D', text: 'O Sistema de Arquivos Distribuído não suporta permissões de segurança ou controle de consistência, enquanto o de Rede gerencia requisições idempotentes automaticamente.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula03_2.pdf (Slide 3) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seção 19). O material explicita que no sistema de arquivos de rede "cada arquivo está em um servidor e o usuário deve conhecer o nome do servidor", enquanto no sistema de arquivos distribuído há "vários arquivos espalhados em vários servidores e o usuário acessa esses arquivos como se fossem um arquivo local".'
      },
      {
        id: 'final-q2',
        difficulty: 'Fácil',
        theme: 'Redes Peer-to-Peer (P2P) e DHT',
        question: 'As redes Peer-to-Peer (P2P) organizam os nós da rede para permitir o compartilhamento e a localização de dados. O que caracteriza essencialmente uma rede P2P estruturada em comparação a uma rede P2P não estruturada?',
        options: [
          { key: 'A', text: 'A obrigatoriedade de utilizar um servidor central para validar acessos e manter o registro de arquivos de todos os nós.' },
          { key: 'B', text: 'A realização de buscas por inundação (flooding), enviando a requisição para todos os nós vizinhos de forma aleatória.' },
          { key: 'C', text: 'O uso de um processo padronizado (como uma DHT) em que um hash/chave é calculado para cada recurso e nó, alocando o recurso ao nó que mais se aproxima de seu hash.' },
          { key: 'D', text: 'A exigência de que cada nó atue estritamente como cliente ou exclusivamente como servidor durante toda a sessão.' }
        ],
        answer: 'C',
        explanation: 'Fundamentação no PDF: Aula02_2.pdf (Slide 6) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seção 14). Na P2P estruturada, "os recursos são encontrados e acessados usando um processo padronizado... a maneira mais comum é o uso de uma DHT".'
      },
      {
        id: 'final-q3',
        difficulty: 'Média',
        theme: 'Execução Remota, IDL e Stubs',
        question: 'Na execução remota de métodos entre objetos localizados em máquinas distintas, a primeira fase envolve a interface local. De acordo com o material, qual é o papel da IDL (Interface Definition Language) e do stub nessa etapa?',
        options: [
          { key: 'A', text: 'A IDL gerencia o roteamento de rede no sistema operacional; o stub é o banco de dados ativo responsável por armazenar o histórico de requisições.' },
          { key: 'B', text: 'A IDL exibe a interface dos métodos públicos do objeto remoto, permitindo criar na máquina cliente um objeto local espelho chamado stub, que converte chamadas em requisições gerais.' },
          { key: 'C', text: 'A IDL intercepta e executa os cálculos na CPU remota; o stub substitui a placa de rede na entrega física das mensagens.' },
          { key: 'D', text: 'A IDL realiza a troca de contexto entre processos do sistema operacional; o stub resolve condições de corrida através de variáveis compartilhadas.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula02_2.pdf (Slide 14) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seção 18). O material afirma que os objetos exibem seus métodos públicos usando IDL e que "a partir da interface o objeto A pode criar um objeto local que é um espelho do objeto remoto B conhecido como stub".'
      },
      {
        id: 'final-q4',
        difficulty: 'Média',
        theme: 'Arquiteturas P2P: Superpeers e Redes Híbridas',
        question: 'Em redes Peer-to-Peer (P2P), diferentes estratégias são utilizadas para organizar a rede e otimizar a localização de recursos. Com base no material didático, qual é a função dos superpeers (superpares) e como funcionam as redes híbridas?',
        options: [
          { key: 'A', text: 'Os superpeers realizam trocas de contexto na CPU; as redes híbridas proíbem o uso da arquitetura cliente-servidor.' },
          { key: 'B', text: 'Os superpeers mantêm índices para interligar nós e evitar que redes não estruturadas fiquem desconexas; as redes híbridas acumulam características, como no BitTorrent, que usa um servidor Web para obter o arquivo .torrent e depois usa a DHT para localizar o arquivo na rede.' },
          { key: 'C', text: 'Os superpeers convertem chamadas assíncronas em síncronas; as redes híbridas funcionam exclusivamente por meio do protocolo de exclusão mútua.' },
          { key: 'D', text: 'Os superpeers eliminam os roteadores da rede física; as redes híbridas dependem de um único nó mestre que centraliza a gravação de todos os arquivos do cluster.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula02_2.pdf (Slides 10 e 11) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seção 14). Superpeers "podem ser usados para manter índices que interligam outros nós e evitam que uma rede não estruturada se torne uma rede desconexa". As redes híbridas acumulam modelos, exemplificadas pelo BitTorrent.'
      },
      {
        id: 'final-q5',
        difficulty: 'Média',
        theme: 'Concorrência: Condição de Corrida, Região Crítica e Mutex',
        question: 'Em sistemas operacionais multitarefa e cooperativos, a gerência de acesso a recursos compartilhados é fundamental. O que caracteriza uma Condição de Corrida (Race Condition) e qual é a função do mutex (exclusão mútua)?',
        options: [
          { key: 'A', text: 'Condição de corrida é o tempo de overhead gerado no salvamento de registradores; o mutex é o algoritmo que seleciona qual processo usará a CPU.' },
          { key: 'B', text: 'Condição de corrida é a situação em que dois ou mais processos leem e escrevem um dado compartilhado e o resultado final depende da ordem de execução; o mutex é a estratégia que impede que mais de um processo acesse a região crítica simultaneamente.' },
          { key: 'C', text: 'Condição de corrida ocorre quando o buffer do modelo produtor-consumidor é limitado; o mutex força todos os processos a mudarem para o estado "Esperando".' },
          { key: 'D', text: 'Condição de corrida é a falha gerada pela perda de pacotes na rede; o mutex cria cópias do processo na fila de jobs.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula01_2.pdf (Slides 20 e 22) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seções 8 e 9). Condição de corrida é a "condição em que dois processos leem e escrevem um dado compartilhado e o resultado final depende da ordem em que os processos são executados". Exclusão mútua (mutex) é a estratégia para "evitar que mais de um processo leia/escreva ao mesmo tempo" na região crítica.'
      },
      {
        id: 'final-q6',
        difficulty: 'Média',
        theme: 'Comunicação entre Processos (IPC) e o Problema do Produtor-Consumidor',
        question: 'Para cumprir seus objetivos, processos cooperativos precisam se comunicar. O material apresenta duas formas principais de Comunicação entre Processos (IPC) e o paradigma Produtor-Consumidor. Sobre esses conceitos, assinale a alternativa correta:',
        options: [
          { key: 'A', text: 'Na passagem de mensagens, os processos obrigatoriamente se comunicam utilizando variáveis compartilhadas no espaço de memória do usuário.' },
          { key: 'B', text: 'Na memória compartilhada, a troca de informações é realizada exclusivamente por meio das funções send(destino, mensagem) e receive(origem, mensagem).' },
          { key: 'C', text: 'No problema do Produtor-Consumidor, o processo produtor gera informações que são consumidas pelo consumidor, sendo analisadas as variações de buffer ilimitado (sem limite prático de tamanho) e buffer limitado (tamanho fixo).' },
          { key: 'D', text: 'O uso de memória compartilhada elimina a possibilidade de condições de corrida, tornando dispensável o controle de acesso à região crítica.' }
        ],
        answer: 'C',
        explanation: 'Fundamentação no PDF: Aula01_2.pdf (Slide 19) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seções 6 e 7). O problema trata do paradigma onde "processo produtor produz informações que são consumidas por um processo consumidor", distinguindo buffer ilimitado e limitado.'
      },
      {
        id: 'final-q7',
        difficulty: 'Média',
        theme: 'Características dos Sistemas de Arquivos Distribuídos: Tolerância a Falhas e Consistência',
        question: 'O projeto de Sistemas de Arquivos Distribuídos abrange características vitais como Tolerância a Falhas e Consistência. Segundo o material, quais mecanismos e regras tratam corretamente esses aspectos?',
        options: [
          { key: 'A', text: 'A tolerância a falhas pode utilizar requisições configuradas para ser idempotentes (em que várias requisições iguais geram um único efeito); na consistência, o acesso somente leitura pode ser compartilhado, mas o acesso de escrita deve ser exclusivo.' },
          { key: 'B', text: 'A tolerância a falhas exige a remoção de todos os servidores secundários; a consistência determina que operações de escrita sejam compartilhadas simultaneamente entre todos os clientes.' },
          { key: 'C', text: 'A tolerância a falhas é obtida configurando clientes magros na interface; a consistência proíbe o uso de cache distribuído em qualquer hipótese.' },
          { key: 'D', text: 'A tolerância a falhas depende de transformar o sistema distribuído em um sistema de arquivos de rede; a consistência exige que os arquivos fiquem centralizados em um único nó local.' }
        ],
        answer: 'A',
        explanation: 'Fundamentação no PDF: Aula03_2.pdf (Slides 9 e 10) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seção 21). "Requisições podem ser configuradas para ser idempotentes (várias requisições iguais geram um único efeito)". Para consistência: "Acesso somente leitura pode ser compartilhado / Acesso de escrita deve ser exclusivo".'
      },
      {
        id: 'final-q8',
        difficulty: 'Difícil',
        theme: 'Gerenciamento de Processos, Escalonamento e Troca de Contexto',
        question: 'O Sistema Operacional gerencia a execução de múltiplos processos organizando-os em filas, alternando seus estados e alocando recursos. Analise as afirmativas abaixo sobre o ciclo de vida dos processos e os algoritmos de escalonamento:\nI. O escalonador a curto prazo (ou de CPU) é invocado com alta frequência (milissegundos) para selecionar qual processo da fila de pronto será executado a seguir.\nII. O escalonador a longo prazo (ou de job) é invocado com menor frequência e controla o grau de multiprogramação ao selecionar quais processos devem ser trazidos para a fila de pronto.\nIII. Durante a troca de contexto, a CPU realiza trabalho útil ao processar as instruções de E/S dos processos ativos, aproveitando o tempo de transição.\nIV. O PCB (Process Control Block) guarda informações do processo, incluindo estado do processo, contador de programa, registradores e limites de memória.\nEstão corretas as afirmativas:',
        options: [
          { key: 'A', text: 'I e III, apenas.' },
          { key: 'B', text: 'I, II e IV, apenas.' },
          { key: 'C', text: 'II, III e IV, apenas.' },
          { key: 'D', text: 'I, II, III e IV.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula01_2.pdf (Slides 6, 8, 12 e 13) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seções 1, 2 e 4). As afirmativas I, II e IV são corretas. A afirmativa III é incorreta porque "o tempo de troca de contexto é overhead; o sistema não realiza trabalho útil enquanto faz a troca".'
      },
      {
        id: 'final-q9',
        difficulty: 'Difícil',
        theme: 'Middleware, Interceptadores e Arquitetura da Execução Remota',
        question: 'Em middlewares baseados em objetos remotos e Chamadas de Procedimento Remoto (RPC), a abstração da comunicação ocorre em camadas. Analise o fluxo de invocação remota entre um objeto $A$ (local) e um objeto $B$ (remoto) e assinale a alternativa que descreve corretamente esse processo:',
        options: [
          { key: 'A', text: 'O objeto $A$ acessa diretamente a placa de rede da máquina remota sem passar por middlewares ou tradução de formatos.' },
          { key: 'B', text: 'O interceptador traduz o pedido da aplicação para o middleware; a execução remota divide-se em 3 fases: interface local (usando IDL e stub), tradução pelo middleware (resolvendo representação e serialização) e transformação em pedido de rede enviado pelo S.O..' },
          { key: 'C', text: 'A tradução pelo middleware altera o estado do processo no cliente de "Executando" para "Novo", interrompendo a chamada se for síncrona.' },
          { key: 'D', text: 'O stub é gerado na máquina remota $B$ para executar a exclusão mútua nos dados da máquina $A$ antes do envio pela rede.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula02_2.pdf (Slides 12 a 16) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seções 17 e 18). Descreve o papel do interceptador e as 3 fases exatas da execução remota especificadas no material.'
      },
      {
        id: 'final-q10',
        difficulty: 'Difícil',
        theme: 'Arquiteturas de Sistemas Distribuídos, Transações ACID e Aplicações em 3 Camadas',
        question: 'A organização de Sistemas Distribuídos exige a escolha de arquiteturas e garantias transacionais adequadas. Avalie as proposições a seguir:\nNa arquitetura de aplicações em três camadas (Interface, Processamento e Dados), a camada de Interface abrange os conceitos de clientes magros e clientes gordos.\nAs propriedades ACID de uma transação garantem que ela seja Atômica (indivisível), Consistente (não viola regras), Isolada (não afeta outras transações) e Durável (alterações efetuadas permanecem).\nNa arquitetura centralizada há separação clara entre clientes e servidores; na descentralizada não há separação clara, podendo cada equipamento atuar como cliente e/ou servidor.\nRedes P2P não estruturadas utilizam obrigatoriamente uma DHT para associar recursos a chaves e alocá-los no nó mais próximo.\nAssinale a alternativa correta:',
        options: [
          { key: 'A', text: 'Apenas as proposições 1 e 4 estão corretas.' },
          { key: 'B', text: 'Apenas as proposições 1, 2 e 3 estão corretas.' },
          { key: 'C', text: 'Apenas as proposições 2, 3 e 4 estão corretas.' },
          { key: 'D', text: 'Todas as proposições (1, 2, 3 e 4) estão corretas.' }
        ],
        answer: 'B',
        explanation: 'Fundamentação no PDF: Aula02_2.pdf (Slides 2, 4, 5, 6 e 9) e Revisao_Sistemas_Distribuidos (1)_2.pdf (Seções 13, 14, 15 e 16).Proposição 1: Correta (Aula02_2.pdf, S4). Proposição 2: Correta (Aula02_2.pdf, S2). Proposição 3: Correta (Aula02_2.pdf, S5). Proposição 4: Incorreta. Quem utiliza DHT e chaves é a P2P estruturada. A não estruturada possui ligações aleatórias e realiza buscas por inundação.'
      }
    ],
    discursive: []
  }
};

window.courseQuestions = courseQuestions;

/**
 * Base de Dados Acadêmica do Curso de Sistemas Distribuídos
 * Conteúdo compilado estritamente das Aulas 01, 02 e 03.
 */
const courseData = {
    modules: [
        {
            id: 1,
            title: "Módulo 1: Fundamentos de SO, Concorrência e IPC",
            subtitle: "Gerenciamento de Processos, Troca de Contexto e Regiões Críticas",
            readingTime: "25 min de leitura",
            sections: [
                {
                    id: "sec-1-1",
                    title: "1. Conceito de Processo, Estados e PCB",
                    content: `
                        <p>Um <strong>processo</strong> é um programa em execução. Diferente de um programa estático armazenado em disco, um processo é uma entidade ativa que possui um espaço de desempenhos em memória, registradores de CPU e recursos alocados pelo Sistema Operacional (SO).</p>
                        
                        <h3>Estados de um Processo</h3>
                        <p>Durante sua existência, um processo transita entre diversos estados operacionais:</p>
                        <ul>
                            <li><strong>Novo (New):</strong> O processo está sendo criado.</li>
                            <li><strong>Executando (Running):</strong> As instruções do processo estão sendo executadas pela CPU.</li>
                            <li><strong>Esperando (Waiting / Blocked):</strong> O processo aguarda a ocorrência de um evento externo (como E/S de disco ou recepção de pacote na rede).</li>
                            <li><strong>Pronto (Ready):</strong> O processo possui todos os recursos necessários e aguarda a alocação de um processador.</li>
                            <li><strong>Terminado (Terminated):</strong> O processo finalizou sua execução.</li>
                        </ul>

                        <div class="diagram-container">
                            <h4>Diagrama de Transição de Estados do Processo</h4>
                            <svg viewBox="0 0 700 220" class="svg-diagram">
                                <rect x="20" y="90" width="100" height="40" rx="8" class="svg-node" />
                                <text x="70" y="115" class="svg-text">Novo</text>
                                
                                <path d="M 120 110 L 170 110" class="svg-arrow" marker-end="url(#arrow)" />
                                
                                <rect x="180" y="90" width="100" height="40" rx="8" class="svg-node" />
                                <text x="230" y="115" class="svg-text">Pronto</text>
                                
                                <path d="M 280 100 L 410 100" class="svg-arrow" marker-end="url(#arrow)" />
                                <text x="345" y="90" class="svg-subtext">Escalonado</text>
                                
                                <rect x="420" y="90" width="100" height="40" rx="8" class="svg-node active" />
                                <text x="470" y="115" class="svg-text">Executando</text>
                                
                                <path d="M 440 130 L 260 130" class="svg-arrow" marker-end="url(#arrow)" />
                                <text x="350" y="148" class="svg-subtext">Interrupção / Quantum</text>

                                <path d="M 470 130 L 470 170 L 330 170 L 330 130" class="svg-arrow" marker-end="url(#arrow)" />
                                <text x="400" y="185" class="svg-subtext">Espera Evento / E/S</text>

                                <rect x="280" y="170" width="100" height="40" rx="8" class="svg-node" />
                                <text x="330" y="195" class="svg-text">Esperando</text>

                                <path d="M 520 110 L 580 110" class="svg-arrow" marker-end="url(#arrow)" />
                                <rect x="590" y="90" width="90" height="40" rx="8" class="svg-node" />
                                <text x="635" y="115" class="svg-text">Terminado</text>

                                <defs>
                                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary-color)"/>
                                    </marker>
                                </defs>
                            </svg>
                        </div>

                        <h3>PCB (Process Control Block)</h3>
                        <p>O <strong>Process Control Block</strong> é a estrutura de dados central mantida pelo kernel para gerenciar cada processo individualmente. O PCB armazena informações como:</p>
                        <ul>
                            <li>Identificador do Processo (PID) e estado atual.</li>
                            <li>Contador de Instrução (Program Counter - PC).</li>
                            <li>Registradores da CPU e informações de alocação de memória.</li>
                            <li>Status de E/S e lista de arquivos abertos.</li>
                        </ul>
                    `
                },
                {
                    id: "sec-1-2",
                    title: "2. Escalonamento, Troca de Contexto e Tipos de Processos",
                    content: `
                        <p>A <strong>Troca de Contexto (Context Switch)</strong> ocorre quando o SO interrompe a execução de um processo na CPU e passa o controle para outro. O estado do processo atual é salvo no seu PCB e o estado do novo processo é restaurado a partir do PCB deste último. Como não realiza trabalho útil direto do usuário durante essa operação, a troca de contexto representa um <em>overhead</em> de processamento.</p>

                        <h3>Classificação quanto ao Perfil de Execução</h3>
                        <div class="table-responsive">
                            <table class="custom-table">
                                <thead>
                                    <tr>
                                        <th>Tipo de Processo</th>
                                        <th>Comportamento Principal</th>
                                        <th>Gargalo Principal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>CPU-Bound</strong></td>
                                        <td>Realiza cálculos matemáticos e processamento intenso; gasta a maior parte do tempo no estado <em>Executando</em>.</td>
                                        <td>Velocidade do Processador (Clock / Cores).</td>
                                    </tr>
                                    <tr>
                                        <td><strong>I/O-Bound</strong></td>
                                        <td>Realiza operações frequentes de leitura/escrita em disco ou comunicação de rede; gasta a maior parte do tempo no estado <em>Esperando</em>.</td>
                                        <td>Dispositivos de E/S e Latência de Rede.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `
                },
                {
                    id: "sec-1-3",
                    title: "3. Comunicação Entre Processos (IPC) e Concorrência",
                    content: `
                        <p>A Comunicação Entre Processos (<em>Inter-Process Communication - IPC</em>) permite que diferentes processos troquem dados e coordenem suas ações no mesmo sistema ou em nós distintos.</p>

                        <h3>Modelos Primários de IPC</h3>
                        <ul>
                            <li><strong>Memória Compartilhada (Shared Memory):</strong> Dois ou mais processos compartilham uma região comum de memória RAM. É o mecanismo mais rápido localmente, mas exige sincronização manual rigorosa para evitar corrupção de dados.</li>
                            <li><strong>Troca de Mensagens (Message Passing):</strong> Processos trocam dados via primitives <code>send(mensagem)</code> e <code>receive(mensagem)</code> intermediadas pelo SO. É o modelo fundamental estendido para Redes e Sistemas Distribuídos.</li>
                        </ul>

                        <div class="highlight-box danger">
                            <h4>⚠️ Condição de Corrida (Race Condition)</h4>
                            <p>Ocorre quando múltiplos processos leem e escrevem no mesmo dado compartilhado simultaneamente, e o resultado final da operação depende da ordem imprevisível e exata com que as instruções são executadas pela CPU.</p>
                        </div>

                        <h3>Região Crítica e Mutex (Exclusão Mútua)</h3>
                        <p>A <strong>Região Crítica</strong> é o trecho de código que acessa um recurso compartilhado que não pode ser manipulado concorrentemente. Para garantir a consistência, utilizam-se mecanismos como o <strong>Mutex</strong> (Lock de Exclusão Mútua).</p>
                        
                        <p><strong>As 4 Condições Obrigatórias para uma Solução de Região Crítica:</strong></p>
                        <ol>
                            <li><strong>Exclusão Mútua:</strong> Dois processos nunca podem estar dentro de suas regiões críticas simultaneamente.</li>
                            <li><strong>Sem Suposições de Velocidade:</strong> Nenhuma suposição pode ser feita sobre a velocidade ou quantidade de CPUs.</li>
                            <li><strong>Sem Progresso Bloqueado:</strong> Nenhum processo fora de sua região crítica pode bloquear outros processos de entrarem na região crítica.</li>
                            <li><strong>Sem Await Indefinito:</strong> Nenhum processo deve ter que esperar indefinidamente para entrar na região crítica (evitando <em>starvation</em>).</li>
                        </ol>
                    `
                }
            ]
        },
        {
            id: 2,
            title: "Módulo 2: Conceitos de SD, Middleware e Execução Remota",
            subtitle: "Modelos de Sistemas Distribuídos, Abstração de Rede e Arquitetura RPC",
            readingTime: "20 min de leitura",
            sections: [
                {
                    id: "sec-2-1",
                    title: "1. Definição de Sistemas Distribuídos e Transparência",
                    content: `
                        <p>Um <strong>Sistema Distribuído (SD)</strong> é uma coleção de computadores independentes (nós) interconectados por uma rede que se apresenta para os seus usuários e aplicações como um <strong>sistema único e coerente</strong>.</p>

                        <h3>Sistemas Únicos e Clusters</h3>
                        <p>Em um cluster de servidores, embora existam dezenas ou centenas de máquinas fisicamente separadas, a camada de software mascara a distribuição para que o cliente realize requisições sem precisar conhecer em qual nó físico o cálculo ou armazenamento é efetuado.</p>

                        <h3>Dimensões da Transparência</h3>
                        <ul>
                            <li><strong>Transparência de Localização:</strong> O usuário não sabe onde o recurso está fisicamente localizado no ambiente de rede.</li>
                            <li><strong>Transparência de Migração:</strong> Recursos podem se mover entre nós sem alterar a forma como são acessados.</li>
                            <li><strong>Transparência de Replicação:</strong> O sistema mantém múltiplas cópias do mesmo dado sem que o cliente saiba da duplicidade.</li>
                            <li><strong>Transparência de Falhas:</strong> O sistema oculta a falha e a recuperação de componentes individuais.</li>
                        </ul>
                    `
                },
                {
                    id: "sec-2-2",
                    title: "2. O Papel do Middleware e Interceptadores",
                    content: `
                        <p>O <strong>Middleware</strong> é uma camada lógica de software posicionada entre o Sistema Operacional local e a Aplicação Distribuída. Sua função primária é prover abstração de rede, heterogeneidade de hardware/linguagens e facilidades de comunicação transparente.</p>

                        <div class="diagram-container">
                            <h4>Pilha de Software em um Sistema Distribuído</h4>
                            <div class="stack-box">Aplicações Distribuídas</div>
                            <div class="stack-box highlight">Camada de Middleware (RPC, RMI, ORB, Message Brokers)</div>
                            <div class="stack-box">Sistema Operacional Local e Protocolos de Rede (TCP/IP)</div>
                            <div class="stack-box">Hardware / Nós da Rede</div>
                        </div>

                        <h3>Interceptadores (Interceptors)</h3>
                        <p>Os <strong>Interceptadores</strong> são componentes de software do Middleware projetados para interceptar e modificar o fluxo normal de chamadas e mensagens sem alterar a lógica principal da aplicação. São utilizados para injetar serviços como autenticação, geração de logs, medição de latência e criptografia automática de dados em trânsito.</p>
                    `
                },
                {
                    id: "sec-2-3",
                    title: "3. Execução Remota em 3 Fases (RPC e Stubs)",
                    content: `
                        <p>A execução remota de procedimentos (<em>Remote Procedure Call - RPC</em>) permite que um programa invoque uma função em outra máquina com a mesma sintaxe de uma chamada de função local.</p>

                        <h3>As 3 Fases da Execução Remota</h3>
                        <ol>
                            <li><strong>Interface Local (IDL e Stub):</strong> A aplicação interage com um objeto espelho local chamado <strong>Client Stub</strong>, gerado a partir de uma linguagem de definição de interface (IDL - <em>Interface Definition Language</em>). O Stub converte os parâmetros locais em um formato padrão.</li>
                            <li><strong>Tradução pelo Middleware (Serialização / Marshalling):</strong> O Middleware empacota os dados e argumentos da chamada em um buffer de bytes independente de arquitetura (Marshalling) para envio através dos sockets de rede.</li>
                            <li><strong>Transmissão e Execução no Servidor:</strong> A mensagem é transmitida via rede. O <strong>Server Stub</strong> na máquina de destino desempacota a requisição (Unmarshalling) e chama a rotina local real do servidor, retornando o resultado pelo mesmo caminho.</li>
                        </ol>

                        <div class="highlight-box info">
                            <h4>Comunicação Síncrona vs. Assíncrona</h4>
                            <p><strong>RPC Síncrono:</strong> O cliente realiza a chamada e fica bloqueado (em espera) até que o servidor processe a requisição e retorne a resposta.<br>
                            <strong>RPC Assíncrono:</strong> O cliente envia a requisição e continua seu processamento imediatamente, recebendo o resultado via callback ou promessa quando disponível.</p>
                        </div>
                    `
                }
            ]
        },
        {
            id: 3,
            title: "Módulo 3: Transações ACID, Arquiteturas e Redes P2P",
            subtitle: "Garantias Transacionais, Estilos Arquiteturais e Topologias P2P / DHT",
            readingTime: "22 min de leitura",
            sections: [
                {
                    id: "sec-3-1",
                    title: "1. Propriedades ACID em Transações Distribuídas",
                    content: `
                        <p>Para manter a integridade dos dados em sistemas onde múltiplos nós realizam leituras e escritas concorrentes, as operações são agrupadas em <strong>Transações</strong> que atendem às propriedades ACID:</p>

                        <div class="acid-grid">
                            <div class="acid-card">
                                <h4>A - Atomicidade</h4>
                                <p>Princípio do "Tudo ou Nada". A transação é executada por completo ou todas as suas modificações são descartadas (Rollback).</p>
                            </div>
                            <div class="acid-card">
                                <h4>C - Consistência</h4>
                                <p>Garante que a transação levara o sistema de um estado válido a outro estado igualmente válido, respeitando todas as regras de integridade.</p>
                            </div>
                            <div class="acid-card">
                                <h4>I - Isolamento</h4>
                                <p>A execução concorrente de transações produz o mesmo resultado que se tivessem sido executadas sequencialmente, de forma isolada.</p>
                            </div>
                            <div class="acid-card">
                                <h4>D - Durabilidade</h4>
                                <p>Uma vez confirmada (Commit), os efeitos da transação persistem permanentemente no armazenamento, mesmo em caso de falha do sistema.</p>
                            </div>
                        </div>
                    `
                },
                {
                    id: "sec-3-2",
                    title: "2. Arquiteturas Logicas e a Estrutura em 3 Camadas",
                    content: `
                        <p>Sistemas distribuídos utilizam diferentes estilos arquiteturais para estruturar a responsabilidade dos componentes:</p>
                        <ul>
                            <li><strong>Arquiteturas em Camadas (Layered):</strong> Organização em níveis hierárquicos onde cada camada provê serviços para a camada superior.</li>
                            <li><strong>Arquitetura Orientada a Eventos:</strong> Componentes se comunicam publicando e consumindo eventos via barramentos de mensagens.</li>
                        </ul>

                        <h3>Aplicações em 3 Camadas (3-Tier)</h3>
                        <p>Modelo clássico de divisão lógica em software empresarial:</p>
                        <ol>
                            <li><strong>Camada de Apresentação (Interface):</strong> Responsável pela interação direta com o usuário (browsers, apps).</li>
                            <li><strong>Camada de Processamento (Regras de Negócio):</strong> Contém a lógica central da aplicação.</li>
                            <li><strong>Camada de Dados (Persistência):</strong> Bancos de dados e sistemas de arquivos.</li>
                        </ol>

                        <p><strong>Cliente Magro (Thin Client) vs. Cliente Gordo (Fat Client):</strong> Em clientes magros, o nó do usuário apenas exibe a interface e delega o processamento pesado para a camada de aplicação. Em clientes gordos, a máquina local executa parte expressiva do processamento e validação de dados.</p>
                    `
                },
                {
                    id: "sec-3-3",
                    title: "3. Arquiteturas Centralizadas vs Descentralizadas e Redes P2P",
                    content: `
                        <p>Enquanto o modelo <strong>Cliente-Servidor</strong> centraliza o controle e o acesso a recursos em servidores dedicados, o modelo <strong>Peer-to-Peer (P2P)</strong> distribui as responsabilidades igualmente entre os nós da rede (pares).</p>

                        <h3>Topologias P2P</h3>
                        <div class="table-responsive">
                            <table class="custom-table">
                                <thead>
                                    <tr>
                                        <th>Tipo de Rede P2P</th>
                                        <th>Mecanismo de Busca e Descoberta</th>
                                        <th>Vantagens / Desvantagens</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>P2P Estruturado (DHT)</strong></td>
                                        <td>Topologia estritamente organizada por <em>Distributed Hash Tables</em> (ex: Chord). As chaves de recursos são mapeadas deterministicamente para nós específicos por funções de hash.</td>
                                        <td><strong>Vantagem:</strong> Busca garantida e rápida em tempo $O(\log N)$.<br><strong>Desvantagem:</strong> Alto custo de manutenção da tabela durante entradas/saídas de nós.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>P2P Não Estruturado</strong></td>
                                        <td>Sem organização rígida. A localização de recursos utiliza <strong>Inundação (Flooding)</strong> ou caminhadas aleatórias.</td>
                                        <td><strong>Vantagem:</strong> Tolerante a alta volatilidade de nós.<br><strong>Desvantagem:</strong> Não garante que o recurso será encontrado e gera alto tráfego de rede.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Superpeers (Superpares)</strong></td>
                                        <td>Nós com maior capacidade de processamento e largura de banda assumem funções de indexação para nós normais adjacentes.</td>
                                        <td>Combina a eficiência da busca centralizada com a resiliência P2P.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Redes Híbridas</strong></td>
                                        <td>Utilizam servidores centralizados para inicialização e busca de metadados, enquanto a transferência de dados ocorre diretamente entre os pares (Exemplo: BitTorrent).</td>
                                        <td>Alta performance de transferência com controle de catálogo eficiente.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `
                }
            ]
        },
        {
            id: 4,
            title: "Módulo 4: Sistemas de Arquivos Distribuídos (DFS)",
            subtitle: "Conceitos de DFS, Montagem Unix, Idempotência e Consistência",
            readingTime: "25 min de leitura",
            sections: [
                {
                    id: "sec-4-1",
                    title: "1. Conceito de DFS e Montagem (Mounting) de Arquivos",
                    content: `
                        <p>Um <strong>Sistema de Arquivos Distribuído (DFS - Distributed File System)</strong> permite que clientes em rede acessem arquivos armazenados em servidores remotos exatamente da mesma maneira que acessam arquivos em seus discos locais.</p>

                        <h3>Arquivos de Rede (NFS) vs. Sistemas de Arquivos Distribuídos (DFS)</h3>
                        <p>O **NFS (Network File System)** é uma arquitetura cliente-servidor tradicional que expõe um diretório remoto via rede. Um **DFS** moderno distribui dados, metadados e réplicas por múltiplos nós independentes para atingir alta disponibilidade e transparência.</p>

                        <h3>Conceito de Montagem (Mounting) em Unix</h3>
                        <p>No modelo de arquivos estilo Unix, diretórios remotos fornecidos por servidores DFS são "montados" em um ponto específico da árvore de diretórios local (ex: <code>/mnt/dados_remotos</code>). Para a aplicação e para o usuário final, a navegação nos arquivos do servidor ocorre de forma idêntica à navegação no disco rígido local.</p>
                    `
                },
                {
                    id: "sec-4-2",
                    title: "2. Os 5 Pilares Fundamentais dos Sistemas DFS",
                    content: `
                        <p>Todo sistema de arquivos distribuído robusto é projetado em torno de cinco propriedades essenciais:</p>

                        <div class="pillars-grid">
                            <div class="pillar-card">
                                <span class="pillar-num">1</span>
                                <h4>Transparência de Localização e Nomeação</h4>
                                <p>O nome e o caminho do arquivo não revelam onde o recurso está armazenado fisicamente na infraestrutura de servidores.</p>
                            </div>
                            <div class="pillar-card">
                                <span class="pillar-num">2</span>
                                <h4>Escalabilidade</h4>
                                <p>Capacidade de expandir a capacidade total de armazenamento e a vazão de E/S adicionando novos nós sem interromper os serviços.</p>
                            </div>
                            <div class="pillar-card">
                                <span class="pillar-num">3</span>
                                <h4>Segurança Distribuída</h4>
                                <p>Garantia de autenticação rigorosa dos clientes, controle de acesso refinado (ACLs) e criptografia de dados em trânsito e em repouso.</p>
                            </div>
                            <div class="pillar-card">
                                <span class="pillar-num">4</span>
                                <h4>Tolerância a Falhas e Idempotência</h4>
                                <p>Resiliência contra falhas de rede ou queda de servidores. Requisições <strong>Idempotentes</strong> garantem que repetir a mesma operação múltiplas vezes produz exatamente o mesmo resultado sem corromper dados.</p>
                            </div>
                            <div class="pillar-card">
                                <span class="pillar-num">5</span>
                                <h4>Consistência e Estratégias de Cache</h4>
                                <p>Mecanismos para coordenar edições simultâneas (como travas de escrita exclusiva e leitura compartilhada) evitando divergências de conteúdo entre o cache local do cliente e os servidores.</p>
                            </div>
                        </div>
                    `
                },
                {
                    id: "sec-4-3",
                    title: "3. Estudos de Caso e Ecossistema Moderno de DFS",
                    content: `
                        <p>Diversas soluções foram desenvolvidas para atender diferentes exigências de escalabilidade e desempenho:</p>
                        <ul>
                            <li><strong>Ceph:</strong> Sistema de armazenamento distribuído unificado e totalmente desprovido de ponto único de falha (Single Point of Failure), que provê interfaces de blocos, objetos e arquivos de alto desempenho.</li>
                            <li><strong>JuiceFS:</strong> Sistema de arquivos distribuído POSIX projetado para funcionar sobre storages de objetos em nuvem (S3), oferecendo cache local para alta performance de leitura.</li>
                            <li><strong>Storj:</strong> Rede de armazenamento em nuvem descentralizada baseada em P2P e criptografia de ponta a ponta.</li>
                            <li><strong>Kertish-DFS:</strong> Exemplo acadêmico voltado ao estudo do desacoplamento entre servidores de metadados e nós de armazenamento de blocos.</li>
                        </ul>
                    `
                }
            ]
        }
    ]
};

window.courseData = courseData;

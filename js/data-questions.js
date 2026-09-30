const modulesData = {
  "1": {
    title: "Fundamentos de Engenharia de Software",
    eyebrow: "Módulo 1 de 5",
    description: "Comece pelo vocabulário e pela visão de conjunto: o que é software, o que é Engenharia de Software, como um produto evolui e quais pessoas participam das decisões.",
    goal: "🎯 Construir uma base conceitual sólida",
    nextModuleUrl: "modulo.html?id=2",
    nextModuleTitle: "Requisitos",
    questions: [
      {
        id: 1,
        question: "De acordo com o módulo, software é melhor entendido como:",
        options: [
          { key: "A", text: "Apenas o código-fonte executável de uma aplicação." },
          { key: "B", text: "Um programa de computador acompanhado da documentação associada e de uma determinada funcionalidade." },
          { key: "C", text: "Somente a parte visual utilizada pelo usuário durante a execução." },
          { key: "D", text: "Um conjunto de regras de negócio sem necessidade de implementação." }
        ],
        answer: "B"
      },
      {
        id: 2,
        question: "Qual alternativa apresenta corretamente a diferença entre software genérico e personalizado?",
        options: [
          { key: "A", text: "O genérico atende uma única organização, enquanto o personalizado atende vários clientes." },
          { key: "B", text: "O genérico não possui documentação, enquanto o personalizado depende exclusivamente dela." },
          { key: "C", text: "O genérico é utilizado apenas por desenvolvedores, enquanto o personalizado é usado apenas por gestores." },
          { key: "D", text: "O genérico atende um conjunto amplo de clientes, enquanto o personalizado é desenvolvido para necessidades específicas." }
        ],
        answer: "D"
      }
      // Adicione as demais questões aqui
    ]
  }
  // Módulos 2, 3, 4 e 5 entram aqui no mesmo formato
};

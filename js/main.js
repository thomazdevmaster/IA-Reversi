(function main () {
    "use strict"

    // declarando variáveis
    var jogadores, jogadorAtual, tabuleiro, tamanho, nivel;
    var tabuleiroContainer = $(".tabuleiroContainer");
    var table;
    var nMov = 0;

    // Iniciando
    start();

    // função inicial
    function start() {
        // definindo nivel
        nivel = parseInt($('#nivel').val());
        // definindo jogadores
        jogadores = [
            new Jogador("HUMANO", 0, false),
            new Jogador("IA", 1, true, nivel)
        ];

        
        // sempre começa com jogador humano
        jogadorAtual = 0;
        tamanho = $('#tam').val();
        tabuleiro = new Tabuleiro(jogadores, tamanho);
        renderizarTabuleiro(tabuleiro.tabuleiro);
    }

    function defineBotao(jogoIniciado) {
        $('#restartButton').text('REINICIAR');
        $('#nome').prop('disabled', true);
        $('#nivel').prop('disabled', true);
        $('#tam').prop('disabled', true);
    }

    function renderizarTabuleiro(tabuleiro) {
        if(jogadores[1].isIa) {
            var saida = `<p>Movimento número ${nMov}, `
          

            saida += jogadores[1].getRelatorioIa()
            $(".relatorio").html(saida)
        }
        // nome do jogador
        var nome = $("#nome").val();
        if (nome !== '') {
            $('#jogador').text(nome)
            jogadores[0].name = nome;
        } else {
            $('#jogador').text("HUMANO")
        }
        // montar table
        // caso já exista (jogo iniciado) apenas adiciona as peça no tabuleiro
        if(table) {
            // Montar botão
            defineBotao();

            // definindo linhas e colunas e verificando peças
            for (var y = 0; y < tabuleiro.length; ++y) {
                for (var x = 0; x < tabuleiro.length; ++x) {
                    // adicionando as peças no tabuleiro
                    var peca = tabuleiro[x][y] ? tabuleiro[x][y] : "";
                    $("#"+x+y).attr('class', "square "+peca);
                }
            }
        // Se não existir cria uma nova tabela
        } else {
            tabuleiroContainer.empty();
            table = "<table class='tabuleiro'>";
            for (var y = 0; y < tabuleiro.length; ++y) {
                table += '<tr>';
                for (var x = 0; x < tabuleiro.length; ++x) {
                    var peca = tabuleiro[x][y] ? tabuleiro[x][y] : "";
    
                    table += '<td class="square '+peca+'" id=' + x + y + '><div></div></td>';
                }
            }
            table += " </table>";
            // adiciona no html
            tabuleiroContainer.append(table);
            
            aguardarHumano();
        }
        // Altera o texto quando inicia
        $(".turn").html('AGUARDANDO INÍCIO') ? 
            $('#restartButton').text == 'REINICIAR' : 
            $(".turn").html("Vez do jogador " + jogadores[jogadorAtual].name);

        // Alterando os scores
        $("#score1").text(jogadores[0].qtdPecas);
        $("#score2").text(jogadores[1].qtdPecas);

        // Modal do vencedor
        $(".winner").hide();
        
    }

    // Espera o jogador realizar a jogada
    function aguardarHumano() {

        // Só é possível o clique se o jogo ja tiver iniciado e o jogador não for IA
        $('.tabuleiro .square').click(function () {
            $(".turn").html('AGUARDANDO INÍCIO')
            if(jogadorAtual !== 0 || $('#restartButton').text() == 'INICIAR') {
                return;
            }
            var $this = $(this);
            var x = parseInt($this.attr('id').charAt(0));
            var y = parseInt($this.attr('id').charAt(1));

            // Realiza o movimento
            movimentarPara(x, y);
        });
    }

    // Realizar o movimento
    function movimentarPara(x, y) {
        // Verifica se o movimento é válido para o jogador
        var movimentoValido = tabuleiro.movimentoValido(x, y, jogadorAtual)

        if(movimentoValido) {
            // Caso o movimento seja válido define o adversário e vira as peças do intervalo
            var outroJogador = jogadorAtual === 0 ? 1 : 0;
            tabuleiro.flip(x, y, jogadorAtual);

            // Recarrega o tabuleiro
            renderizarTabuleiro(tabuleiro.tabuleiro);

            // inverte o jogador
            jogadorAtual = outroJogador;

            // Verifica os possíveis movimentos
            var movimentosValidos = tabuleiro.getMovimentosValidos(jogadorAtual);

            // Caso não tenha mais movimentos verifica se outro jogador tem onde movimentar
            if(!movimentosValidos.length) {
                var movimentosValidosNextJogador = tabuleiro.getMovimentosValidos(jogadorAtual ? 0 : 1);
                if(!movimentosValidosNextJogador.length) {
                    //caso o adversário tenha onde jogar o jogo é finalizado
                    finalizar();
                    return;
                } else {
                    var noTurnJogadorName = jogadores[jogadorAtual].name;
                    setTimeout(function(){
                        alert("Jogador " + noTurnJogadorName + " não tem jogadas disponíveis, passando a vez...");
                    }, 1000);
                    jogadorAtual = jogadorAtual ? 0 : 1;
                }
            }

            // Altera o texto com o nome do jogador
            $(".turn").html("Vez do jogador " + jogadores[jogadorAtual].name) ?
                $('#restarButton').text() == 'REINICIAR' : 
                $(".turn").html("Vez do jogador ")

            // Se o jogador atual for IA, cronometra o tempo da jogada
            if(jogadores[jogadorAtual].isIa) {
                nMov ++;
                setTimeout(function(){
                    var t0 = performance.now()
                    // realiza a análise do movimento
                    var movimento = jogadores[jogadorAtual].getMovimento(tabuleiro);
                    var t1 = performance.now()
                    console.log("IA processou em " + (t1 - t0).toFixed(2) + " millisegundos.");
                    $('.duracao').html(`<p>duração de ${(t1 - t0).toFixed(2)} milissegundos`)
                    // Realiza o movimento
                    movimentarPara(movimento.x, movimento.y);
                }, 3000);
            }
        }
    }

    // Finalizando o jogo
    function finalizar() {
        var messageWin;

        // Verifica o jogador com mais peças
        if(jogadores[0].qtdPecas > jogadores[1].qtdPecas) {
            messageWin = "O vencedor foi o jogador " + jogadores[0].name + "!";
        } else if(jogadores[1].qtdPecas > jogadores[0].qtdPecas) {
            messageWin = "O vencedor foi o jogador " + jogadores[1].name + "!";
        } else {
            messageWin = "O jogo terminou empatado."
        }

        // Exibe a mensagem do vencedor
        $(".winner").show();
        $(".winner").html(messageWin);
    }
    
    // Inicia ou reinicia o jogo
    $("#restartButton").click(function () {
        start();
    });

    // Modifica o tamanho do tabuleiro
    $("#tam").on('change', function() {
        main()
    })

    // Modifica o nível do jogo
    $("#nivel").on('change', function() {
        main()
    })

    // Reinicia o jogo no início
    $("#resetButton").click(function() {
        $('#restartButton').text('INICIAR');
        $('#nome').prop('disabled', false);
        $('#nivel').prop('disabled', false);
        $('#tam').prop('disabled', false);
        main()
    })
})();
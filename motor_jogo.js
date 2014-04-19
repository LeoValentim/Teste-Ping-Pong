			var CANVAS_WIDTH = 800;
			var CANVAS_HEIGHT = 320;
			var canvas;
			var canvasPlacar;
			var Placar;
			var PLACAR_WIDTH = 338;
			var PLACAR_HEIGHT = 158;
			var FPS = 30;
			var player;
			var enemie;
			var bola;
			var mesa;
			var bolaDiametro = 10;
            var bolaDir = false;
            var bolaAngulo = Math.floor(Math.random() * 21) - 10;
            var bolaTempo = 0;
            var enemieCima = false;
            var playerCima = false;
            var playerPT = 0;
            var enemiePT = 0;
            var enemieVelo = 25;
            var bolaVelo = 10;
            var modoHard = false;
            var jogoRodando = false;
            var botaoStart;
            var mesaStart;
            var modoEasy = true;
            var mouseY;
            var mouseX;

            

			function inicializaJogo()
			{
				canvas = document.getElementById("meuCanvas").getContext("2d");
				canvasPlacar = document.getElementById("Placar").getContext("2d");
				criaObjetosJogo();					
				setInterval("loopJogo()", 1000/FPS);
			}
			
			function loopJogo()
			{
				update();
				draw();
			}
			
			function update()
			{
				$(document).ready(function(){						   
					    $("html").mousemove(	function(p){
					    	mouseY = p.clientY;
			           		mouseX = p.clientX;
							$("div.janela").text("Posição: X="+mouseX+" Y="+mouseY);
						})
					});

				if(jogoRodando == true)
				{
					if(mouseY - player.midpoint < 0)
						player.y = 0;
					else if(mouseY - player.midpoint > CANVAS_HEIGHT - player.height)
						player.y = (CANVAS_HEIGHT - player.height);
					else
						player.y = mouseY - player.midpoint;

					/*if (keydown.up && player.y >= 2)
					{
						playerCima = true;
						player.y -= 10;
					}
					if (keydown.down && player.y <= ((CANVAS_HEIGHT - player.height) - 2))
					{
						playerCima = false;
						player.y += 10;
					}
					*/
					
					if(modoEasy == true)
					{
						inteligenciaEnemy();
					}
					else
					{
						if (enemieCima) 
						{
							enemie.y -= enemieVelo;
							if (enemie.y <= 0) 
							{
								enemieCima = false;
							}
						}
						else
						{
							enemie.y += enemieVelo;
							if (enemie.y >= CANVAS_HEIGHT - enemie.height)
							{
								enemieCima = true;
							}
						}
					}
					if (bolaTempo <= 0) 
					{
	                    if (contains(bola, player)) 
	                    {
                            bolaDir = true;
                            Sound.play("pingpong1");
                            if (playerCima)
                            {
                                bolaAngulo = Math.floor(Math.random() * 10) - 9;
                            }
                            else 
                            {
                                bolaAngulo = Math.floor((Math.random() * 10));
                            }
                            bolaVelo ++;
	                    }
	                    else if (contains(bola, enemie)) 
	                    {
                            bolaDir = false;
                            Sound.play("pingpong1");
                            if (enemieCima) 
                            {
                                bolaAngulo = Math.floor(Math.random() * 10) - 9;
                            }
                            else 
                            {
                                bolaAngulo = Math.floor((Math.random() * 10));
                            }
                            bolaVelo ++;
	                    }
	                    
	                    if ((bola.y - 10 <= 0) || (bola.y + 10 > CANVAS_HEIGHT)) 
	                    {
	                        bolaAngulo = bolaAngulo * -1;
	                    }
	                    bola.y += bolaAngulo;
	                    
	                    if (bolaDir)
	                    {
	                        bola.x += bolaVelo;
	                    }
	                    else
	                    {
	                        bola.x -= bolaVelo;
	                    }
	                }
					
	                if ((bola.x <= -10) || (bola.x > CANVAS_WIDTH))
	                {
	                    if (bolaTempo >= 50)
	                    {
	                        if (bola.x <= -10)
	                        {
	                            enemiePT++;
	                            bolaDir = true;
	                        }
	                        else
	                        {
	                            playerPT++;
	                            bolaDir = false;
	                        }
	                    	if (modoHard == true){
	                        	bola.x = (CANVAS_WIDTH / 3) * 2;
	                        	bolaVelo = 20;
	                        	enemieVelo = 50;
	                        }
	                        else{
	                        	bola.x = CANVAS_WIDTH / 2;
	                        	bolaVelo = 10;
	                        }
	                        bola.y = CANVAS_HEIGHT / 2;
	                        bolaAngulo = Math.floor(Math.random() * 21) - 10;
	                        bolaTempo = 0;
	                    }
	                    else
	                    {
	                        bolaTempo++;
	                    }
	                }
	                if (playerPT == 5 || enemiePT == 5)
	                {
	                	fimdejogo();
	                }
                }

			}
			
			function draw()
			{
				limpaTela();
				Mesa.draw();
				if (jogoRodando == false){
					if(playerPT == 5 || enemiePT == 5)
						desenhaTextoGO()
					else
					botaoStart.draw();
				}
				else if(jogoRodando){
					player.draw();
					bola.draw();
					enemie.draw();
					Placar.draw();
					desenhaPlacar();
				}
				
			}
			
			function limpaTela()
			{
				canvas.fillStyle = "#ffffff";
				canvas.fillRect(0, 0, 800, 320);
				canvasPlacar.fillStyle = "#ffffff";
				canvasPlacar.fillRect(0, 0, 338, 158);
			}
			
			function desenhaPlacar()
			{
				canvasPlacar.font = "38pt Helvetica";
				canvasPlacar.fillStyle = "Red";
				if (playerPT < 10){
					canvasPlacar.fillText("0" + playerPT, 56, 135);
				}
				else {
					canvasPlacar.fillText(playerPT, 56, 135);
				}
				if (enemiePT < 10){
					canvasPlacar.fillText("0" + enemiePT, 207, 135);
				}
				else {
					canvasPlacar.fillText(enemiePT, 207, 135);
				}
			}
			
			function desenhaTextoGO()
			{
				canvas.font = "62pt Helvetica";
				canvas.fillStyle = "White";
				if(playerPT == 5){
				canvas.fillText("VOCE GANHOU", 100, (CANVAS_HEIGHT / 3));
				}
				else {
			    canvas.fillText("VOCE PERDEU", 100, (CANVAS_HEIGHT / 3));
			    }
			}

			
			function criaObjetosJogo()
			{
				player = {
					color: "#00A",
					x: 0,
					y: (CANVAS_HEIGHT / 2),
					width: 30,
					height: 90,
					sprite: Sprite("jogador1"),
					midpoint: (90 / 2),
					draw: function()
					{
						this.sprite.draw(canvas, this.x, this.y);
					},
					/*control: function()
					{
						this.
					}*/
				}
				
				bola = {
				color: "black",
					x: (CANVAS_WIDTH / 2),
					y: (CANVAS_HEIGHT / 2),
					width: 10,
					height: 10,
					sprite: Sprite("Bola"),
					draw: function()
					{
						this.sprite.draw(canvas, this.x, this.y);
					},
				
				}
				
				enemie = {
				color: "#00A",
					x: (CANVAS_WIDTH - 30),
					y: 0,
					width: 30,
					height: 90,
					sprite: Sprite("inimigo1"),
					draw: function()
					{
						this.sprite.draw(canvas, this.x, this.y);
					},
				
				}
				
				Mesa = {
				color: "#00A",
					x: 0,
					y: 0,
					width: 800,
					height: 320,
					sprite: Sprite("Mesa"),
					draw: function()
					{
						this.sprite.draw(canvas, this.x, this.y);
					},
				
				}
				
				Placar = {
				color: "#00A",
					x: 0,
					y: 0,
					width: 338,
					height: 158,
					sprite: Sprite("Placar"),
					draw: function()
					{
						this.sprite.draw(canvasPlacar, this.x, this.y);
					},
				
				}
				
				botaoStart = {
				color: "#00A",
					x: ((CANVAS_WIDTH / 2) - (123 / 2)),
					y: ((CANVAS_HEIGHT / 2) - (123 / 2)),
					width: 123,
					height: 123,
					sprite: Sprite("botaoStart"),
					draw: function()
					{
						this.sprite.draw(canvas, this.x, this.y);
					},
				
				}
			}
			
			function inteligenciaEnemy()
			{
				if(bola.x >= (CANVAS_WIDTH / 2) && bolaDir == true)
				{
					if(bola.y > (enemie.y + (enemie.height / 2)) && enemie.y <= (CANVAS_HEIGHT - enemie.height))
					{
						enemie.y += 5;
						enemieCima = false;
					}
					else
					{
						if(bola.y < (enemie.y + (enemie.height / 2)) && enemie.y >= 0)
						{
							enemie.y -= 5;
							enemieCima = true;
						}
						else
						{
							
						}
					}
				}
			}

			function contains(objetoA, objetoB)
			{
				if(objetoA.x < objetoB.x + objetoB.width && 
					objetoA.x + objetoA.width > objetoB.x && 
					objetoA.y < objetoB.y + objetoB.height &&
					objetoA.y + objetoA.height > objetoB.y)
					return true;
				else
					return false;
			}

			function mouseContains(objetoA)
			{
				if(mouseX >= objetoA.x && 
					mouseX <= objetoA.x + objetoA.width && 
					mouseY >= objetoA.y && 
					mouseY <= objetoA.y + objetoA.height)
					return true;
				else
					return false;
			}

			function mouseMovimentando()
			{
				var temp;
				mouse
			}

			function botao()
			{
				var sbotao;
					this.sbotao = botaoStart;
				if(mouseContains(botaoStart))
					rodarJogo();
			}
			
			function rodarJogo()
			{
				jogoRodando = true;
				playerPT = 0;
				enemiePT = 0;
			}
			
			function fimdejogo()
			{
				jogoRodando = false;
			}
			
			function bigImg(x, a, b)
			{
				x.style.height=a;
				x.style.width=b;
			}
	
			function normalImg(x, a, b)
			{
				x.style.height=a;
				x.style.width=b;
			}
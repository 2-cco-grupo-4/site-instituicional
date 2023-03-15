/*
    Função para fazer botão de autenticar usando o instagram aparecer
    Importante: só deve funcionar quando o usuário for um fotógrafo
*/

function visibilidadeAutenticarInstagram(){
    var btnInstagram = document.getElementById("btn-instagram");
    var opcaoUsuario = document.querySelector('input[name="radioOptionsUsuario"]:checked').id;
    if(opcaoUsuario == 'radioFotografo'){
        btnInstagram.style.visibility = 'visible';
    }else{
        btnInstagram.style.visibility = 'hidden';
    }
}
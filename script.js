// --- PREENCHA SUAS INFORMAÇÕES AQUI ---
const GITHUB_USERNAME = "servidorgoulart";
const REPO_NAME = "Painel-Servidor"; // O nome deste repositório
const CODESPACE_NAME = "fictional-succotash-jjwrw96vjprrh5vrj"; // O nome técnico do Codespace do servidor
// ------------------------------------------

const statusElement = document.getElementById('status');

async function triggerAction(action) {
    statusElement.textContent = `Enviando comando para ${action}...`;

    // O URL para acionar o evento no seu repositório
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/dispatches`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            // O TOKEN FOI REMOVIDO DAQUI!
            // A autorização será feita pelo GitHub Actions.
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                event_type: action,
                client_payload: {
                    codespace: CODESPACE_NAME
                }
            }),
        });

        if (response.status === 204) {
            statusElement.textContent = `Comando "${action}" enviado com sucesso! A automação foi iniciada. Aguarde alguns minutos.`;
        } else {
            const data = await response.json();
            statusElement.textContent = `Erro: ${data.message || 'Falha ao enviar comando.'}`;
        }
    } catch (error) {
        statusElement.textContent = `Erro de rede: ${error}`;
    }
}

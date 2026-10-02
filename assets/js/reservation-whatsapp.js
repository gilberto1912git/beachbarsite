/**
 * Bene Beach Bar - Gerenciador de Reservas & Integração WhatsApp
 * Compila todas as informações do formulário com emojis e formatação
 * e envia para o WhatsApp oficial (11) 96218-0691.
 */

const WHATSAPP_PHONE_NUMBER = '5511962180691';

document.addEventListener('DOMContentLoaded', () => {
  initReservationForm();
  initPhoneMask();
});

/**
 * Inicializa o formulário de reserva, eventos de atualização e envio
 */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const previewBox = document.getElementById('whatsappLivePreview');
  const copyBtn = document.getElementById('copyMessageBtn');
  const previewTimestamp = document.getElementById('previewTimestamp');

  if (!form) return;

  // Atualiza horário atual na mensagem de preview
  if (previewTimestamp) {
    const now = new Date();
    previewTimestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Define data mínima como hoje
  const dateInput = document.getElementById('resData');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Atualiza pré-visualização ao vivo
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', updateLivePreview);
    input.addEventListener('change', updateLivePreview);
  });

  // Atualiza preview inicial
  updateLivePreview();

  // Envio do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const compiledMessage = generateCompiledMessage();
    const encodedMessage = encodeURIComponent(compiledMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    // Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('🚀 Redirecionando para o WhatsApp do Bene Beach Bar...');
  });

  // Botão de copiar mensagem compilada
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const compiledMessage = generateCompiledMessage();
      navigator.clipboard.writeText(compiledMessage).then(() => {
        showToast('📋 Mensagem copiada com sucesso!');
      }).catch(() => {
        showToast('❌ Não foi possível copiar automaticamente.');
      });
    });
  }
}

/**
 * Gera o texto estruturado com emojis para o WhatsApp
 */
function generateCompiledMessage() {
  const nome = document.getElementById('resNome')?.value.trim() || '[Não informado]';
  const whatsapp = document.getElementById('resWhatsapp')?.value.trim() || '[Não informado]';
  const dataRaw = document.getElementById('resData')?.value;
  const horario = document.getElementById('resHorario')?.value || '[A definir]';
  const pessoas = document.getElementById('resPessoas')?.value || '1';
  
  // Tipo de Reserva (Radio)
  const tipoReservaEl = document.querySelector('input[name="tipo_reserva"]:checked');
  const tipoReserva = tipoReservaEl ? tipoReservaEl.value : 'Mesa';

  // Motivo
  const motivo = document.getElementById('resMotivo')?.value || 'Encontro com amigos';

  // Aniversariante do Mês
  const aniversarianteEl = document.querySelector('input[name="aniversariante"]:checked');
  const aniversariante = aniversarianteEl ? aniversarianteEl.value : 'Não';

  const convidados = document.getElementById('resConvidados')?.value || 'Apenas eu e o grupo inicial';
  const obs = document.getElementById('resObs')?.value.trim() || 'Nenhuma observação especial';

  // Formata data para formato brasileiro DD/MM/AAAA
  let dataFormatada = '[Data não definida]';
  if (dataRaw) {
    const parts = dataRaw.split('-');
    if (parts.length === 3) {
      dataFormatada = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  return (
`🏖️ *SOLICITAÇÃO DE RESERVA - BENE BEACH BAR* 🍹
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
📅 *Data:* ${dataFormatada}
⏰ *Horário desejado:* ${horario}
👥 *Quantidade de pessoas:* ${pessoas}
🪑 *Tipo de reserva:* ${tipoReserva}
🎉 *Motivo:* ${motivo}
🎂 *Aniversariante do mês:* ${aniversariante}
👥 *Nº de convidados estimados:* ${convidados}
📝 *Observações:* ${obs}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Olá, equipe do Bene Beach Bar!*
Gostaria de verificar a disponibilidade e as condições para confirmar minha reserva. Aguardo o retorno para celebrarmos momentos especiais! 🌴🥂`
  );
}

/**
 * Atualiza a caixa de chat que simula a conversa no WhatsApp
 */
function updateLivePreview() {
  const previewBox = document.getElementById('whatsappLivePreview');
  if (!previewBox) return;

  const message = generateCompiledMessage();
  previewBox.textContent = message;
}

/**
 * Máscara automática de telefone celular (XX) XXXXX-XXXX
 */
function initPhoneMask() {
  const phoneInput = document.getElementById('resWhatsapp');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      // (11) 99999-9999
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      // (11) 9999-9999
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      e.target.value = `(${value}`;
    }
  });
}

/**
 * Pré-preenche o formulário para fluxos diretos (ex: Aniversariantes, Camarotes)
 */
window.prefillReservation = function(tipo, motivo, aniversariante) {
  const formSection = document.getElementById('reservas');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    if (tipo) {
      const radioTipo = document.querySelector(`input[name="tipo_reserva"][value="${tipo}"]`);
      if (radioTipo) radioTipo.checked = true;
    }

    if (motivo) {
      const selectMotivo = document.getElementById('resMotivo');
      if (selectMotivo) selectMotivo.value = motivo;
    }

    if (aniversariante) {
      const radioAniv = document.querySelector(`input[name="aniversariante"][value="${aniversariante}"]`);
      if (radioAniv) radioAniv.checked = true;
    }

    updateLivePreview();
  }, 400);
};

/**
 * Exibe notificação temporária tipo Toast
 */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

let balance = 0;

function updateBalance(amount) {
  balance += amount;
  document.getElementById("balanceAmount").textContent = balance;
}

async function checkSubscription(channel) {
  // Здесь должна быть реализация проверки подписки на канал
  // В данном примере используется фиктивный ответ
  const response = await fetch(`https://api.telegram.org/checkSubscription?channel=${channel}`);
  const data = await response.json();
  return data.subscribed; // Возвращает true или false в зависимости от подписки
}

async function subscribe(channel) {
  const isSubscribed = await checkSubscription(channel);
  if (isSubscribed) {
    updateBalance(0.1);
  } else {
    alert(`Вы не подписались на "${channel}"`);
  }
}

// Добавляем обработчики для кнопок обновления
document.querySelectorAll("#channels button").forEach(button => {
  const updateButton = document.createElement("button");
  updateButton.textContent = "Обновить";
  updateButton.onclick = async function() {
    const channelName = button.textContent.trim();
    await subscribe(channelName);
  };
  button.parentNode.insertBefore(updateButton, button.nextSibling);
});

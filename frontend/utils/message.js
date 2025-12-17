export function getMessageEncouragement() {
    const messages = [
        "Retente ta chance !",
        "Qui ne tente rien n’a rien !",
        "Allez, encore un essai !",
        "Ce n’est qu’un début !",
        "N’abandonne pas maintenant !",
        "Chaque tentative compte !",
        "La prochaine sera la bonne !",
        "Garde confiance en toi !",
        "Rien n’est perdu !",
        "Continue, tu es sur la bonne voie !",
        "Un effort de plus !",
        "Le succès est tout proche !"
    ];

    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

class Notificacoes {
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
        });
    }
    ChannelManagement = () => {
        PushNotification.createChannel(
            {
              channelId: "1",
              channelName: "lembrete",
              playSound: false,
            },
        );
    }
    notificaoInicial = () => {
        PushNotification.localNotification({
            channelId: "1",
            id: 1,
            largeIcon: "icon",
            bigText: "Para cadastrar uma nota você precisa cadastrar um aluno, depois vai a lista de alunos e identificar o botão responsável por tal ação!", // (optional)
            color: "red",
            vibration: 300,
            title: "Cadastrar notas",
            message: "Para cadastrar uma nota ...",
        });
    }
}

export const notificacoes = new Notificacoes();
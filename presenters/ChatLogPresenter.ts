import { action, computed, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';

export class ChatLogPresenter {
    private static instance: ChatLogPresenter;
    chatHistory: Map<string, any> = new Map();
    currentChatId: string | null = null;

    private constructor() {
        makeObservable(this, {
            chatHistory: observable,
            currentChatId: observable,

            setID: action.bound,

            chatID: computed
        });
    }

    static getInstance(): ChatLogPresenter {
        if (!ChatLogPresenter.instance) {
            ChatLogPresenter.instance = new ChatLogPresenter();
        }
        return ChatLogPresenter.instance;
    }

    get chatID(): string {
        return this.chatHistory.keys().next().value;
    }

    createNewChat() {
        const chatId = `station-log-${nanoid()}`;
        this.chatHistory.set(chatId, { id: chatId, messages: [], title: 'New Chat' });
        this.currentChatId = chatId;
        return chatId;
    }


    async getChat(chatId: string) {
        // In the future, this would fetch from MongoDB
        return this.chatHistory.get(chatId) || null;
    }

    setID(chatId: string) {
        this.currentChatId = chatId;
    }

    addMessageToChat(chatId: string, message: any) {
        const chat = this.chatHistory.get(chatId);
        if (chat) {
            chat.messages.push(message);
            this.chatHistory.set(chatId, chat);
            console.log('Added message to chat:', chatId, message);
        }
    }

    // Add more methods as needed for managing chat history
}

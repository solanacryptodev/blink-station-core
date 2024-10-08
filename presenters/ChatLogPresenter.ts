import { action, computed, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';

export class ChatLogPresenter {
    private static instance: ChatLogPresenter;
    chatHistory: Map<string, any> = new Map();
    currentChatId: string | null = null;
    currentMessage: string = '';

    constructor() {
        makeObservable(this, {
            chatHistory: observable,
            currentChatId: observable,
            currentMessage: observable,

            setID: action.bound,
            setCurrentMessage: action.bound,

            chatID: computed,
            message: computed,
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

    get message(): string {
        return this.currentMessage;
    }

    createNewChat(chatId: string) {
        this.chatHistory.set(chatId, { id: chatId, messages: [], title: 'New Chat' });
        this.setID(chatId);  // Set the current chat ID when creating a new chat
        return chatId;
    }

    async getChat() {
        // Make sure currentChatId is set before trying to get the chat
        if (!this.currentChatId) {
            return null;
        }
        return this.chatHistory.get(this.currentChatId) || null;
    }

    setCurrentMessage(message: string) {
        console.log('Current message:', message);
        this.currentMessage = message;
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

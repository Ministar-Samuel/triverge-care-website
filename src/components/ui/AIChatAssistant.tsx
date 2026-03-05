"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
    "What services does Triverge offer?",
    "How do I book a consultation?",
    "Tell me about the HCAP program",
    "What are your visiting hours?",
];

export function AIChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hasGreeted = useRef(false);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Focus input and trigger Alma's greeting when chat first opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
            if (!hasGreeted.current && messages.length === 0) {
                hasGreeted.current = true;
                triggerGreeting();
            }
        }
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const generateId = () => Math.random().toString(36).substring(2, 9);

    // Trigger Alma's initial greeting
    const triggerGreeting = async () => {
        setIsTyping(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Hello", history: [] }),
            });
            if (res.ok) {
                const data = await res.json();
                setMessages([{
                    id: generateId(),
                    role: "assistant",
                    content: data.reply || "Hi! I'm Alma, Triverge Healthcare's AI Care Assist. How can I help you today?",
                    timestamp: new Date(),
                }]);
            }
        } catch {
            setMessages([{
                id: generateId(),
                role: "assistant",
                content: "Hi! I'm Alma, Triverge Healthcare's AI Care Assist. I'm here to help you with your care-related questions. How can I help you today?",
                timestamp: new Date(),
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: generateId(),
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text.trim(),
                    history: messages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                const assistantMessage: Message = {
                    id: generateId(),
                    role: "assistant",
                    content: data.reply || "I'm sorry, I couldn't process that. Please try again.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: generateId(),
                        role: "assistant",
                        content: "I'm having trouble connecting right now. Please try again in a moment, or call us at +234 705 3390 270.",
                        timestamp: new Date(),
                    },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: generateId(),
                    role: "assistant",
                    content: "I'm having trouble connecting right now. Please try again in a moment, or call us at +234 705 3390 270.",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleSuggestion = (question: string) => {
        sendMessage(question);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <>
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-[120px] right-6 z-[60] w-[380px] max-w-[calc(100vw-32px)] h-[540px] max-h-[calc(100vh-180px)] bg-white rounded-[28px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-triverge-blue to-healing-teal p-5 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <Icon icon="solar:magic-stick-3-line-duotone" className="text-xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold font-heading text-[15px] leading-tight">Alma – AI Care Assist</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-white/70 text-xs font-medium">Online — Ask me anything</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Icon icon="solar:close-circle-bold" className="text-white text-lg" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50/50">
                            {/* Welcome message if no messages yet */}
                            {/* Suggested questions shown after Alma's greeting */}
                            {messages.length <= 1 && !isTyping && messages.length > 0 && (
                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <p className="text-xs font-bold text-charcoal/30 uppercase tracking-wider text-center">Quick Questions</p>
                                    {SUGGESTED_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleSuggestion(q)}
                                            className="text-left px-4 py-2.5 rounded-2xl border border-healing-teal/20 bg-white text-sm text-charcoal/70 hover:bg-healing-teal/5 hover:border-healing-teal/40 hover:text-charcoal transition-all"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Message bubbles */}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        {msg.role === "assistant" && (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-healing-teal to-triverge-blue flex items-center justify-center flex-shrink-0 mt-1">
                                                <Icon icon="solar:magic-stick-3-line-duotone" className="text-white text-xs" />
                                            </div>
                                        )}
                                        <div>
                                            <div
                                                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-gradient-to-r from-triverge-blue to-healing-teal text-white rounded-br-sm"
                                                    : "bg-white text-charcoal border border-gray-100 shadow-sm rounded-bl-sm"
                                                    }`}
                                            >
                                                {msg.role === "assistant" ? (
                                                    <div className="alma-message">
                                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                    </div>
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                            <p
                                                className={`text-[10px] mt-1 text-charcoal/30 ${msg.role === "user" ? "text-right" : "text-left"
                                                    }`}
                                            >
                                                {formatTime(msg.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 items-end">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-healing-teal to-triverge-blue flex items-center justify-center flex-shrink-0">
                                            <Icon icon="solar:magic-stick-3-line-duotone" className="text-white text-xs" />
                                        </div>
                                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 rounded-full bg-charcoal/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    disabled={isTyping}
                                    className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-healing-teal/30 focus:border-healing-teal text-sm text-charcoal disabled:opacity-50 placeholder:text-charcoal/30"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="w-10 h-10 rounded-2xl bg-gradient-to-r from-triverge-blue to-healing-teal text-white flex items-center justify-center hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
                                >
                                    <Icon icon="solar:plain-3-bold" className="text-lg" />
                                </button>
                            </form>
                            <p className="text-[10px] text-charcoal/25 text-center mt-2 font-medium">
                                Alma AI • Powered by Triverge Healthcare
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Pill Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-6 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-healing-teal to-[#28b5a8] text-white font-bold font-heading text-sm shadow-lg shadow-healing-teal/30 hover:shadow-xl hover:shadow-healing-teal/40 hover:scale-105 active:scale-95 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <Icon
                    icon={isOpen ? "solar:close-circle-bold" : "solar:magic-stick-3-line-duotone"}
                    className="text-xl"
                />
                <span className="hidden sm:inline">{isOpen ? "Close" : "Ask Our AI Care-Assist"}</span>
            </motion.button>
        </>
    );
}

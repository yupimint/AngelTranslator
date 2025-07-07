import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useChat(currentUser: string | null) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    refetchInterval: 3000, // Poll every 3 seconds for new messages
    enabled: !!currentUser,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, senderName }: { content: string; senderName: string }) => {
      // First, get or create the user
      let userId: number;
      try {
        const userResponse = await apiRequest("GET", `/api/users/${senderName}`);
        const userData = await userResponse.json();
        userId = userData.id;
      } catch (error) {
        // User might not exist, which is handled by the username modal
        userId = 1; // Fallback ID
      }

      return apiRequest("POST", "/api/messages", {
        content,
        senderId: userId,
        senderName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sendMessage = (content: string, senderName: string) => {
    sendMessageMutation.mutate({ content, senderName });
  };

  return {
    messages,
    isLoading,
    sendMessage,
    isSending: sendMessageMutation.isPending,
  };
}

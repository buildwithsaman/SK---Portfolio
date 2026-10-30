export const SITE_CHAT_OPEN = "site-chat-open";

export type SiteChatOpenDetail = {
  question?: string;
  topicId?: string;
};

/** Opens the existing Ask me panel. Optional question uses stored replies. */
export function openSiteChat(detail: SiteChatOpenDetail = {}) {
  window.dispatchEvent(new CustomEvent(SITE_CHAT_OPEN, { detail }));
}

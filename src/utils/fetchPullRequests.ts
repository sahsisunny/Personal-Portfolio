export interface GitHubPullRequest {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    labels: [];
    state: 'closed';
    locked: boolean;
    assignee: null;
    assignees: [];
    milestone: null;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: 'MEMBER';
    active_lock_reason: null;
    draft: boolean;
    pull_request?: {
      url: string;
      html_url: string;
      diff_url: string;
      patch_url: string;
      merged_at: string;
    };
    timeline_url: string;
    performed_via_github_app: null;
    state_reason: null;
    score: number;
  }
    export const fetchPullRequests = async (page: number, perPage: number): Promise<GitHubPullRequest[]> => {
        try {
          const response = await fetch(`https://api.github.com/search/issues?q=type:pr+author:sahsisunny&per_page=${perPage}&page=${page}`, {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          });
          const data = await response.json();
          data.items = data.items.filter((item: GitHubPullRequest) => !item.repository_url.includes('sahsisunny'));
      
          return data.items;
        } catch (error) {
          console.error('Error fetching pull requests:', error);
          return [];
        }
      };
      
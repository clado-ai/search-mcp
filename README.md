# Clado MCP Server

This is an official Model Context Protocol (MCP) Server for Clado.

For detailed API documentation and usage examples, visit the [official Clado documentation](https://docs.clado.ai/).

More information about the Model Context Protocol can be found [here](https://modelcontextprotocol.io/introduction).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tools](#tools)
- [Configuration](#configuration)
- [License](#license)

## Installation

### Manual Installation
To install the server, run:

```bash
npx @clado-ai/mcp <YOUR-CLADO-API-KEY>
```

## Running on Cursor
Add to `~/.cursor/mcp.json` like this:
```json
{
  "mcpServers": {
    "clado": {
      "command": "npx",
      "args": ["-y", "@clado-ai/mcp"],
      "env": {
        "CLADO_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

## Running on Windsurf
Add to your `./codeium/windsurf/model_config.json` like this:
```json
{
  "mcpServers": {
    "clado": {
      "command": "npx",
      "args": ["-y", "@clado-ai/mcp"],
      "env": {
        "CLADO_API_KEY": "YOUR-API-KEY"
      }
    }
  }
}
```

## Claude Desktop app
This is an example config for the Clado MCP server for the Claude Desktop client.

```json
{
  "mcpServers": {
    "clado": {
      "command": "npx",
      "args": ["--yes", "@clado-ai/mcp"],
      "env": {
        "CLADO_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Tools
* `search_for_users` - Search for LinkedIn users with filters like query, school, and match threshold
* `enrich_linkedin` - Retrieves detailed profile information for a specific LinkedIn URL (1 credit per lookup)
* `retrieve_contacts` - Retrieves email addresses and phone numbers for a LinkedIn profile (1 credit per lookup)
* `scrape_linkedin` - Retrieves detailed profile data and posts with comments from a LinkedIn profile URL (2 credits per request)
* `linkedin_post_reactions` - Retrieves reactions and engagement data for a specific LinkedIn post URL


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

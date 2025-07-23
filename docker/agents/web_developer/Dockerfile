# Specialized Dockerfile for the Web_Developer Agent
# This builds upon the base agent image with specific tools for web development.

# Inherit from the base agent environment.
# Assumes the base image has been built and tagged as 'base-agent:latest'.
FROM base-agent:latest

# Switch to the root user to install new software.
USER root

# Install Node.js and npm.
# This provides the JavaScript runtime and package manager.
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# Switch back to the non-root 'agent' user for security.
USER agent

# Set the default command to launch a bash shell.
# This can be overridden to run specific development tasks.
CMD ["/bin/bash"]


# Foundational Dockerfile for Mangakōtukutuku College Agents
# Base Image: A lean and secure Debian Linux environment.
FROM debian:bullseye-slim

# Set up a non-root user for enhanced security.
# Agents will run as 'agent' instead of 'root'.
RUN useradd -m -s /bin/bash agent
USER agent

# Set the working directory inside the container.
# All agent operations will happen here.
WORKDIR /home/agent/work

# Set environment variables to ensure Python outputs are sent straight to the terminal.
ENV PYTHONUNBUFFERED=1

# A placeholder for the agent's entrypoint.
# This will be the command that starts the agent when the container launches.
ENTRYPOINT ["/bin/bash"]

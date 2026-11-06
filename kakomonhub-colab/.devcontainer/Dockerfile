FROM node:24-slim

RUN apt update && apt install -y less man-db sudo git curl

ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
	&& chmod 0440 /etc/sudoers.d/$USERNAME

ENV DEVCONTAINER=true


# Configure git for the node user at build time so the setting is present after image build
RUN git config --global user.email "node@localhost" \
	&& git config --global user.name "node"

# Default to an interactive shell — users can `docker run -it <image>` to inspect/verify git config
CMD ["bash"]
#!/bin/bash

# Houtcore Website Installation Script
# Sets up the website to start automatically at boot time

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Installing Houtcore Website for Boot Startup...${NC}"

# Get current user and directory
CURRENT_USER=$(whoami)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}📁 Installation directory: $SCRIPT_DIR${NC}"
echo -e "${BLUE}👤 Current user: $CURRENT_USER${NC}"

# Make scripts executable
echo -e "${GREEN}🔧 Making scripts executable...${NC}"
chmod +x "$SCRIPT_DIR/start-services.sh"
chmod +x "$SCRIPT_DIR/backend/deploy.sh"
chmod +x "$SCRIPT_DIR/fix-colors.sh"

# Update the systemd service file with correct paths and user
echo -e "${GREEN}🔧 Configuring systemd service...${NC}"
sed -i "s|User=houtcore|User=$CURRENT_USER|g" "$SCRIPT_DIR/houtcore-website.service"
sed -i "s|Group=houtcore|Group=$CURRENT_USER|g" "$SCRIPT_DIR/houtcore-website.service"
sed -i "s|/home/houtcore/houtcore-website|$SCRIPT_DIR|g" "$SCRIPT_DIR/houtcore-website.service"

# Install the systemd service
echo -e "${GREEN}📋 Installing systemd service...${NC}"
sudo cp "$SCRIPT_DIR/houtcore-website.service" /etc/systemd/system/

# Reload systemd and enable the service
echo -e "${GREEN}🔄 Enabling service for boot startup...${NC}"
sudo systemctl daemon-reload
sudo systemctl enable houtcore-website.service

echo -e "${GREEN}✅ Installation Complete!${NC}"
echo ""
echo -e "${BLUE}📊 Service Management Commands:${NC}"
echo -e "  🚀 Start service:    sudo systemctl start houtcore-website"
echo -e "  🛑 Stop service:     sudo systemctl stop houtcore-website"
echo -e "  🔄 Restart service:  sudo systemctl restart houtcore-website"
echo -e "  📊 Service status:   sudo systemctl status houtcore-website"
echo -e "  📝 View logs:        sudo journalctl -u houtcore-website -f"
echo ""
echo -e "${BLUE}🔗 After installation:${NC}"
echo -e "  • Website will start automatically at boot"
echo -e "  • Frontend: http://localhost:3000"
echo -e "  • Backend API: http://localhost:8000/api/"
echo -e "  • Admin: http://localhost:8000/admin/"
echo ""
echo -e "${YELLOW}💡 Manual testing:${NC}"
echo -e "  • Test now: sudo systemctl start houtcore-website"
echo -e "  • Or run manually: ./start-services.sh"
echo ""

# Ask if user wants to start the service now
read -p "Do you want to start the service now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}🚀 Starting Houtcore Website service...${NC}"
    sudo systemctl start houtcore-website
    sleep 3
    
    echo -e "${BLUE}📊 Service Status:${NC}"
    sudo systemctl status houtcore-website --no-pager -l
    
    echo -e "${GREEN}✅ Service started! Check http://localhost:3000${NC}"
else
    echo -e "${YELLOW}ℹ️  Service installed but not started. Use 'sudo systemctl start houtcore-website' when ready.${NC}"
fi

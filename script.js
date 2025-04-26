function openTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.style.display = (terminal.style.display === 'none') ? 'flex' : 'none';
  }
  
  function saveEncryptedHTML() {
    const htmlContent = document.documentElement.outerHTML;
    const encryptedContent = btoa(unescape(encodeURIComponent(htmlContent)));
  
    const blob = new Blob([encryptedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_page.ibmsave';
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function openEncryptedFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ibmsave';
  
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const encryptedContent = e.target.result;
          const decryptedContent = decodeURIComponent(escape(atob(encryptedContent)));
  
          document.open();
          document.write(decryptedContent);
          document.close();
        } catch (error) {
          alert('Failed to open file. It might be corrupted.');
          console.error(error);
        }
      };
      reader.readAsText(file);
    };
  
    input.click();
  }
  
  function handleCommand(event) {
    if (event.key === 'Enter') {
      const input = document.getElementById('terminal-input');
      const output = document.getElementById('terminal-output');
      const command = input.value.trim();
      if (command !== '') {
        output.innerHTML += `<div style="color:lightgreen;">> ${command}</div>`;
        
        if (command.toLowerCase() === 'generate ldap sos interface') {
          output.innerHTML += `<div style="color:yellow;">Generating SOS interface...</div>`;
          output.scrollTop = output.scrollHeight;
          input.value = '';
  
          setTimeout(() => {
            output.innerHTML += `<div style="color:lightgreen;">SOS interface Generated.</div>`;
            document.getElementById('sos-status').innerText = 'Not Connected';
            document.getElementById('ldap-status').innerText = 'Connected';
            document.getElementById('instance-count').innerText = ' 13';
            document.getElementById('sos-status').style.color = 'red';
            document.getElementById('ldap-status').style.color = 'green';
            output.scrollTop = output.scrollHeight;
          }, 5000);
  
        } else if (command.toLowerCase() === 'help') {
          output.innerHTML += `<div style="color:yellow;">Reading Commands...</div>`;
          output.scrollTop = output.scrollHeight;
          input.value = '';
  
          setTimeout(() => {
            output.innerHTML += `<div style="color:lightgreen;">generate ldap sos interfaces</div>`;
            output.innerHTML += `<div style="color:lightgreen;">start sos interface.</div>`;
            output.innerHTML += `<div style="color:lightgreen;">stop sos interface.</div>`;
            output.scrollTop = output.scrollHeight;
          }, 1000);
  
        } else if (command.toLowerCase() === 'start sos interface') {
          output.innerHTML += `<div style="color:yellow;">starting SOS interface...</div>`;
          output.scrollTop = output.scrollHeight;
          input.value = '';
  
          setTimeout(() => {
            output.innerHTML += `<div style="color:lightgreen;">SOS interface started.</div>`;
            document.getElementById('sos-status').innerText = 'Running';
            document.getElementById('sos-status').style.color = 'lightgreen';
            output.scrollTop = output.scrollHeight;
          }, 5000);
  
        } else if (command.toLowerCase() === 'stop sos interface') {
          output.innerHTML += `<div style="color:yellow;">Stopping SOS interface...</div>`;
          output.scrollTop = output.scrollHeight;
          input.value = '';
  
          setTimeout(() => {
            output.innerHTML += `<div style="color:lightgreen;">SOS interface stopped.</div>`;
            document.getElementById('sos-status').innerText = 'Stopped';
            document.getElementById('sos-status').style.color = 'red';
            output.scrollTop = output.scrollHeight;
          }, 5000);
  
        } else {
          input.value = '';
          output.scrollTop = output.scrollHeight;
        }
      }
    }
  }
  
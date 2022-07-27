let config = await axios.get(`../config.json`);
const amb = (window.location.hostname === "localhost") ? config.data.dev : config.data.prod;
firebase.initializeApp(config.data);

const db = firebase.firestore()
count.innerHTML = '<div id="loading" class="fas fa-spinner fa-pulse" role="status"></div>';
//ChildEventListener
db.collection('sites').onSnapshot(doc => {
  doc.docChanges().map(change => {
    if (change.type === 'added' && (change.doc.id === amb.main)) {
      db.collection('sites').doc(amb.main).update({
        count: parseInt(change.doc.data().count) + 1,
        hash: amb.hash
      })
    } else if ((change.type === 'modified') && (change.doc.id === amb.main)) {
      count.textContent = change.doc.data().count
    }
  })
  if (document.querySelector('#loading')) count.innerHTML = '<div class="fa fa-exclamation-triangle"></div>';
})
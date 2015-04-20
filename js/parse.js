var facebookData = './data/facebook_aug30-2014.json';
var names        = [];
var friendsLinks = [];
var myName;

$.getJSON( facebookData, {
  format: 'json'
}).done(function (data) {
  buildData(data);
});

function buildData (data) {
  myName = data[0].uid2;
  names.push(myName);
  getFriendsNames(data);
  getFriendsLinks(data);
}

function getFriendsNames (data) {
  var nodeString = '&nbsp;&nbsp;&nbsp;&nbsp;{"name":"' + myName + '"},<br/>';

  $('body').append('{<br/>&nbsp;&nbsp;"nodes": [<br/>');

  $.each (data, function(i, node) {
    if (node.uid2 === myName) {
      names.push(node.uid1);
      nodeString += '&nbsp;&nbsp;&nbsp;&nbsp;{"name":"' + node.uid1 + '"},<br/>';
    } else if (node.uid1 === myName) {
      names.push(node.uid2);
      nodeString += '&nbsp;&nbsp;&nbsp;&nbsp;{"name":"' + node.uid2 + '"},<br/>';
    }
  });
  // Append the string but remove the last <br/> and ,
  $('body').append( nodeString.slice(0, -6) + '<br/>&nbsp;&nbsp;],<br/>&nbsp;&nbsp;"links": [<br/>');
}

function getFriendsLinks(data) {
  var personName;
  var personIndex;
  var linkString = '';

  $.each (names, function(namesIndex, namesNode) {
    personName = namesNode;

    $.each (data, function(nodeIndex, node) {
      if (node.uid1 === personName) {
        var nameToLink = node.uid2;
        var targetIndex = names.indexOf(nameToLink);
        linkString += '&nbsp;&nbsp;&nbsp;&nbsp;{"source":' + namesIndex + ', "target":' + targetIndex + '},<br/>';
      }
    });
  });

  $('body').append( linkString.slice(0, -6) + '<br/>&nbsp;&nbsp;]<br/>}');
}
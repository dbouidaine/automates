<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>TP_THP</title>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
  <!-- Google Fonts Roboto -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <!-- Material Design Bootstrap -->
  <link rel="stylesheet" href="css/mdb.min.css">
  <!-- Your custom styles (optional) -->
  <link rel="stylesheet" href="myStyle.css">
</head>
<body>
    <div class="">
    <div class="flex-center flex-column">
      <div class="section-1 col-12">
        <div class="container mt-3" id="myTP">
          <h2>TP_THP</h2>
          <br>
          <!-- Nav tabs -->
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#home">Introduire</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#menu1">Résultats</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#menu2">Reconnaissance</a>
            </li>
          </ul>
        
          <!-- Tab panes -->
          <div class="tab-content">
            <!--Intriductuin de l'automate-------------------------------------------->
            <div id="home" class="container tab-pane active"><br>
              <h3>Décrire l'automate</h3>
                <div id="accordion">
                <br>
                
                  <!--Alphabet-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#collapseOne">
                        #1 Introduire l'ensemble d'alphabets
                      </a>
                    </div>
                    <div id="collapseOne" class="collapse show" data-parent="#accordion">
                      <div class="card-body">
                        <!-- Editable table -->
                          <div class="card-body">
                            <div id="table" class="table-editable">
                              <table class="table un table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                  <tr>
                                    <th class="text-center">l'Alphabet</th>
                                    <th class="text-center">Remove</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td class="pt-3-half" contenteditable="true">a</td>
                                    <td>
                                      <span class="table-remove" id="remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <span class="table1-add un float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                                class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
                            </div>
                          </div>
                        <!-- Editable table -->
                      </div>
                    </div>
                  </div><br>
                  <!----------------------------------------------------------------------------->  
                  <!--Les Etats-------------------------------------------------------------------->
                  <div class="card disabled">
                    <div class="card-header">
                      <a class="card-link text-black-50" data-toggle="collapse" href="#collapseTwo">
                        #2 Introduire l'ensemble d'états
                      </a>
                    </div>
                    <div id="collapseTwo" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        <!-- Editable table -->
                          <div class="card-body">
                            <div id="table2" class="table-editable">
                              <span class="table2-add float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                                    class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                  <tr>
                                    <th class="text-center">l'Etat</th>
                                    <th class="text-center">Remove</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td class="pt-3-half" contenteditable="true">Si</td>
                                    <td>
                                      <span class="table-remove" id="remove2"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        <!-- Editable table -->
                      </div>
                    </div>
                  </div><br>
                  <!----------------------------------------------------------------------------->
                  <!--L'état initial -------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#collapseThree">
                        #3 Désigner l'état initial
                      </a>
                    </div>
                    <div id="collapseThree" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        <!-- Editable table -->
                          <div class="card-body">
                            <div id="table3" class="table-editable">
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                  <tr>
                                    <th class="text-center">l'Etat initial</th>
                                  </tr>
                                </thead>
                                <tbody id="initMir">
                                  <tr>
                                  <td class="pt-3-half" contenteditable="true">SI</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        <!-- Editable table -->
                      </div>
                    </div>
                  </div><br>
                  <!----------------------------------------------------------------------------->
                  <!--Les Etats finaux-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#collapseFour">
                        #4 Désigner l'ensemble d'états finaux
                      </a>
                    </div>
                    <div id="collapseFour" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        <!-- Editable table -->
                          <div class="card-body">
                            <div id="table4" class="table-editable">
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                  <tr>
                                    <th class="text-center">l'Etat final</th>
                                    <th class="text-center">Remove</th>
                                  </tr>
                                </thead>
                                <tbody id="finMir">
                                  <tr>
                                    <td class="pt-3-half" contenteditable="true">SFi</td>
                                    <td>
                                      <span class="table-remove" id="remove4"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <span class="table4-add float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                                    class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
                            </div>
                          </div>
                        <!-- Editable table -->
                      </div>
                    </div>
                  </div><br>
                  <!----------------------------------------------------------------------------->
                  <!--Les Transitions-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#collapseFive">
                        #5 Définir les transitions
                      </a>
                    </div>
                    <div id="collapseFive" class="collapse" data-parent="#accordion"> 
                      <div class="card-body">
                        <!-- Editable table -->
                          <div class="card-body">
                            <div id="table5" class="table-editable">
                              <table class="table table-bordered table-responsive-md table-striped text-center">
                                <thead>
                                  <tr>
                                    <th class="text-center">L'état Avant</th>
                                    <th class="text-center">Le Mot</th>
                                    <th class="text-center">L'état Après</th>
                                    <th class="text-center">Remove</th>
                                  </tr>
                                </thead>
                                <tbody id="transitionsMir">
                                  <tr>
                                    <td class="pt-3-half" contenteditable="true">S-</td>
                                    <td class="pt-3-half" contenteditable="true">aaa</td>
                                    <td class="pt-3-half" contenteditable="true">S+</td>
                                    <td>
                                      <span class="table-remove" id="remove5"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <span class="table5-add float-right mb-3 mr-2"><a href="#!" class="text-success"><i
                                    class="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>                           
                            </div>
                          </div>
                        <!-- Editable table -->
                      </div>
                    </div>
                  </div><br>
                </div>
                <div class="right"><button onclick="miroir()" id="updateMir" class="btn btn-lg btn-block blue-gradient">Miroir <i id="checkedMir" style="display: none;" class="fas fa-check"></i></button></div><br>
                <div class="right"><button onclick="updateAll()" id="updateAll" class="btn btn-lg btn-block aqua-gradient">Mettre A Jour <i id="checkedAll" style="display: none;" class="fas fa-check"></i></button></div>
                <br>
                <!--<div class="d-flex col-12">
                  <div class="col-6 justify-content-center">
                    <button id="saveFile" class="btn btn-light">Save Automate</button>
                  </div>
                  <div class="col-6 justify-content-center">
                    <input class="ml-auto" placeholder="Nom de fichier" type="text" id="path"><button id="readFile" class="btn btn-light">Load Automate</button> 
                  </div>
                </div>-->
                <br><br>
            </div>
            <!--/Intriductuin de l'automate-------------------------------------------->
            <!--Les Résultats-------------------------------------------->
            <div id="menu1" class="container tab-pane fade"><br>
              <h3>Resultats</h3>
              <p>Operations sur les automates</p>
              
              <div>
                <br>
                <div id="accordion2">
                  <!--Reduction-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" href="#collapseOne2">
                        # Réduction
                      </a>
                    </div>
                    <div id="collapseOne2" class="collapse show" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="redStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Avant</th>
                                <th class="text-center">le Mot</th>
                                <th class="text-center">l'Etat Après</th>
                              </tr>
                            </thead>
                            <tbody  id="redTransitions">
                            </tbody>
                          </table>
                        </div>          
                      </div>
                    </div>
                  </div><br>
                  <!--/Reduction-------------------------------------------------------------------->
                  <!--e-Fermetures-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo2">
                        # e-Fermetures:
                      </a>
                    </div>
                    <div id="collapseTwo2" class="collapse" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="eStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Avant</th>
                                <th class="text-center">le Mot</th>
                                <th class="text-center">l'Etat Après</th>
                              </tr>
                            </thead>
                            <tbody  id="eTransitions">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div><br>
                  <!--/e-Fermetures-------------------------------------------------------------------->
                  <!--toAlpha-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree2">
                        # toAlpha:
                      </a>
                    </div>
                    <div id="collapseThree2" class="collapse" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="alphaStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr id="alphaHeader">
                                <th class="text-center">l'Etat Avant</th>
                              </tr>
                            </thead>
                            <tbody  id="alphaTransitions">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div><br>
                  <!--/toAlpha-------------------------------------------------------------------->
                  <!--Deterministe-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#collapseFour2">
                        # Deterministe:
                      </a>
                    </div>
                    <div id="collapseFour2" class="collapse" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="detStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr id="detHeader">
                                <th class="text-center">l'Etat Avant</th>
                              </tr>
                            </thead>
                            <tbody  id="detTransitions">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div><br>
                  <!--/Deterministe-------------------------------------------------------------------->
                  <!--Complet-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#collapseFive2">
                        # Complet:
                      </a>
                    </div>
                    <div id="collapseFive2" class="collapse" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="comStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr id="comHeader">
                                <th class="text-center">l'Etat Avant</th>
                              </tr>
                            </thead>
                            <tbody  id="comTransitions">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div><br>
                  <!--/Complet-------------------------------------------------------------------->
                  <!--Complement-------------------------------------------------------------------->
                  <div class="card">
                    <div class="card-header">
                      <a class="collapsed card-link" data-toggle="collapse" href="#collapseSix2">
                        # Complement:
                      </a>
                    </div>
                    <div id="collapseSix2" class="collapse" data-parent="#accordion2">
                      <div class="card-body">
                        <div>
                          <strong>Les Etats Finaux</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr>
                                <th class="text-center">l'Etat Final</th>
                              </tr>
                            </thead>
                            <tbody  id="compStates">
                            </tbody>
                          </table>
                        </div> 
                        <div>
                          <strong>Les Transitions</strong>
                          <table class="table un table-bordered table-responsive-md table-striped text-center">
                            <thead>
                              <tr id="compHeader">
                                <th class="text-center">l'Etat Avant</th>
                              </tr>
                            </thead>
                            <tbody  id="compTransitions">
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div><br>

                  <!--/Complement-------------------------------------------------------------------->
                </div>

              </div>

            </div>
            <!--/Les Résultats-------------------------------------------->
            <div id="menu2" class="container tab-pane fade"><br>
              <h3>Reconnaissance d'un mot: </h3>
              <div class="md-form">
                <input type="text" id="aLire" oninput="lecture()" class="form-control">
                <label for="aLire">Entrer le mot a lire ... </label>
                <button class="btn btn-lg btn-block btn-light waves-effect waves-light" id="lecture">Entrer un mot</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Start your project here-->  
      
      </div>
    </div>
  </div>
<!----------------------------------------------------------------------------->
  <!-- End your project here-->

  <!-- jQuery -->
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="js/mdb.min.js"></script>
  <!-- Your custom scripts (optional) -->
  <script type="text/javascript" src="tables.js"></script>
  <script type="text/javascript" src="myFunctions.js"></script>
  <script type="text/javascript" src="js/filesaver.js"></script>

</body>
</html>

# SIMPLE YAML compiler Web UI (frontend)
Frontend for the SIMPLE YAML Compiler GUI web application.

Backend repository can be found [here](https://github.com/simple-framework/simple_web_compiler_backend).

### How to deploy to OpenShift
 0) Download the OKD client [oc](https://www.okd.io/download.html).
 1) Execute the `oc login` command from the OpenShift dashboard.
 2) Select project using `oc project`.
 3) Deploy app  by executing `npx simple-nodeshift --strictSSL=false --dockerImage=nodeshift/ubi8-s2i-web-app --imageTag=latest --expose` inside of the project root directory.
 4) Expose route to the Internet using `oc annotate route simple-web-compiler-frontend router.cern.ch/network-visibility=Internet`

  **WARNING:** If the frontend works but when uploading a file it hangs check that the backend route is also exposed and the hosts are not conflicting.

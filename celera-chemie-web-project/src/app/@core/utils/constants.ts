export default class Constants {
  public static readonly emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  public static readonly phoneNumberRegex = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  );

  public static readonly specialCharsShortRegex = new RegExp(
    /^(?!\s*$)(?!.*\s$)(?![-\s])[^`=~!@#$^*\[\]\/\\{}"|<>?]{1,100}$/
  );

  public static readonly specialCharsLongRegex = new RegExp(
    /^(?!\s*$)(?!.*\s$)(?![-\s])[^`=~!@#$^*\[\]\/\\{}"|<>?]{1,3000}$/
  );

  public static readonly urlRegex = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  );

  public static readonly images = {
    instrumentsImg:
      'https://am3pap003files.storage.live.com/y4pPYJMlQSUBXtZexCYflN1v9VH345zRuc2HxZWOAn7q-yUjyl4P0a9MRG2bN1lPTO9Ts5249-WhsCcOlvRVt4ff7vFvygrAQFbf_X6x_jnsc8p29sjmeUSoq7qRMyb6y8ss5is48Ldo_3KRNWGyvTe7kJfuvUfgP9C5WXmFoy1DF44cFspokwShaTZa0naf9Rc/Instruments.png?psid=1&width=967&height=788',
    filtersImg:
      'https://am3pap003files.storage.live.com/y4pEo7epzXxnVg-XRnEZ3Rw8lNSKOPv3fFo1cX9XzAQNE1j2iw8TJ5VZNq6Og7UUxnGmtu1-h3xm_8Re5WzQBtgiW16YcXOpC9gbuGy5FhzfSUJPiQD6yO8Wd-7QwPrs19np4LaXjRWIRncCwb4FtoR2-xXw9SvePm9DXl7wUo8fCe2LNcS7hn85iEPYiciqOc3/Filters.png?psid=1&width=1131&height=849',
    chemicalsImg:
      'https://am3pap003files.storage.live.com/y4pMcaZxZJM81kBw8qBLvGN3XvDydbvnKWdo79dcAd3RKyWAYRBIZBU83NmwhdpBu3tHT51CvcMC3GMHTUgy7Bl7QkvhNFRc3vkxtsW9BLdR22tTrLsirNu5PwBLPdWiC-xjcrEM5EEqmRIThYtuiRci0zmR57irF2SjXI9DEWAFi16r2Bav-vIuYFA-Oa9-hfX/Chemicals.png?psid=1&width=1533&height=765',
    glasswareImg:
      'https://am3pap003files.storage.live.com/y4pSmhmlu0RO3P_3IW1IE8OBkRbSIorKAM2CFTq9UAWfBFAvlDYgfv9-SYj4nAi5vsKW7xWJOByJs2d-o3mZg65QwWpiM2Cj2yvXe76s7e3y8eLsYbnhY6OVRzipbF2z7kB1btkikRoi51Z_LeNj1gNArD3chypSI_7X46TZpENnmdG0wK7qMLm1kWvXVzwe7_v/Glass.png?psid=1&width=1170&height=710',
    consumablesImg:
      'https://am3pap003files.storage.live.com/y4pbFhfWS7yz8eOS6CsMlSZpwrgwihLvXCgoGKE7rwUDjy1fTRTlsz8mGm3MbfnaxmGc8bPkQwgxRYR2rPpMbyjsv7nSFYQYS-w510PFkBAL0Cvb6azup9eahQ1CzPz2klAa8vH29EmRGYfASZizk964UqeAf60BdVTGZs955xsLzj20bdbkaOiUvSzYEmCJne5/Consumables.png?psid=1&width=1280&height=812',
    defaultProductsImg:
      'https://am3pap003files.storage.live.com/y4p4LnPussbqWK1voC8nwOcAQAyBGWToFrM4-HJd87FiHIZ9zhuUwumBYK_vGuzOeWJXcxyHq29niMbdT3kzkIz8A91p2zMg6j-Lf2MxEWgh648DoZZN9i3QsExTmThRMx1FkVgThjQfBrG-K8CSBn69LCxUFCrz6HsFWXu18A122IVKsr0W_QuUznoeXugb7fn/Products.png?psid=1&width=1274&height=849',

    homePageImgs: [
      'https://am3pap003files.storage.live.com/y4pfR_xd2n5VukSLSfP_2IJdx1eOPqxGnxMgVAFs7wLRtrff7NlGb4N-D5-HGwSKDaEEPizdEbtnmFh7nonKg94W5bXjeIDZ-nSsx2SOJltKfMLsHw4VcYEtubYrcdUXB68QeXDnkYY9G5sPnhhsdRUl1GMaGbmYITUjK5ESRUEqYm_9YWoiCyhoNQhkVtxIJvc/69.jpg?psid=1&width=1266&height=366',
      'https://am3pap003files.storage.live.com/y4pRbEuEgePKHryXuGW_zMmLMwu1iK0gDqG2iM6FMaFXI1PwXgNgsPK3P2YjgdlbV_Up1c0pTyUPQKXtTvufCTN6yidsUmTwohFE0mAZ9hqc8-kHvFgO1KvwBVTtdUCpvIhMHxM-baqmsT6fYVlPsBkDiu-pr0tOl5Z5Emr5D8m2FBlbc_iPmBkUtsdcIXJc-R5/70.jpg?psid=1&width=1266&height=366',
      'https://am3pap003files.storage.live.com/y4pkRB0ECGiR6DhozcdK9HP9ymUR_91SoHNAvu70nQFhasY9VTa2Zj1ZmL4XOQwgjJa8uGuw35LC0pouwb02AWWWDR2_XrpDy5ySocUeZIv-EnR9OZ70hsHICSA5oWZ45N-jWhDexHFkFeulQK9Fk-su_RZXjAOYSglNirvzgJq0FTKEePUuwVH0QSlo_J0iUYM/Vaccubrand_Controller.png?psid=1&width=1048&height=450',
      'https://am3pap003files.storage.live.com/y4pZ5DfZ7ths7y0j1G28rScdEm5Be_Xin-MDFLvVjPdsXX3mNboCBsqSblGHx8Z6gMVW9MHs7fDrTs2e5OjAISvWi-4AM1iHWDu7rxM_hWuoL2zYSMZHYI4SptPkmwJT6W5DYGHDEB5pcNvAGxew_AUcJ1ZyhN3YvReWy06TrXWrtACFPvfVTbfY6fSG_oW6uTB/56.jpg?psid=1&width=1266&height=366',
      'https://am3pap003files.storage.live.com/y4p7uahmjEK7ifWH8dR7kcrOqhYVQscNZMVszOainMmlxizqA37rPhhtdG0wOlAquGCpmsEIfuVRIo78MT8FmlTdNCQ2ynmXMf0Zi0hbhvIP4eGQFyPmxAJ82G7id99fql873q-YUNwFy1QIlO83CGdXLC9WWOxS8AstKfRPNYwYikot3clflay8spTijYdpSBh/72.jpg?psid=1&width=1266&height=366',
      'https://am3pap003files.storage.live.com/y4p9oLrOar_Dqlj8m8Fdw7LZjpuUBYqf7w5t-Ay-C9gRuz9mw5MQG5-0SM5UqpK3emgBc_hH82YvWfzVB8aBrqzERbRnerCWj9j3YnSL0Vl3MH1XmUcltda51lVj5QsP2p4VpTZ6ZXfhzipVkTX1txhBdFl9sN9LEwkwHShFYGRjADCqBoB6Of-cacT4Vg6ffAG/CarloErba.png?psid=1&width=1173&height=386',
      'https://am3pap003files.storage.live.com/y4pvh6g6-9tGCPrqoA4_CXGPXjgp48O2ltUjjp6c0D-UrhZCh8y6yw-MgKniAqWsC-UTB3i_XYHtPyzQ08z1YgdmV-_Ukp7EW6lZ6dUQn6VMYkLCGbmOozFA4Xc_BckEGd_FbFTUOeaaGnj6Ctv-9kw2udzokiBR1LCJ1HNDPtWUAgmQphApS3aHzXTxcb4nmMl/68.jpg?psid=1&width=1266&height=366',
    ],

    defaultHomeImg:
      'https://am3pap003files.storage.live.com/y4pfR_xd2n5VukSLSfP_2IJdx1eOPqxGnxMgVAFs7wLRtrff7NlGb4N-D5-HGwSKDaEEPizdEbtnmFh7nonKg94W5bXjeIDZ-nSsx2SOJltKfMLsHw4VcYEtubYrcdUXB68QeXDnkYY9G5sPnhhsdRUl1GMaGbmYITUjK5ESRUEqYm_9YWoiCyhoNQhkVtxIJvc/69.jpg?psid=1&width=1266&height=366',
  };
}

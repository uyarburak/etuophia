# -*- coding: utf-8 -*-
"""
    Etuophia Tests
    ~~~~~~~~~~~~~~

    Tests the Etuophia application.

    :copyright: (c) 2017 by Burak UYAR.
"""
import os
import tempfile
import pytest
from etuophia import etuophia


@pytest.fixture
def client(request):
    db_fd, etuophia.app.config['DATABASE'] = tempfile.mkstemp()
    client = etuophia.app.test_client()
    with etuophia.app.app_context():
        etuophia.init_db()

    def teardown():
        """Get rid of the database again after each test."""
        os.close(db_fd)
        os.unlink(etuophia.app.config['DATABASE'])
    request.addfinalizer(teardown)
    return client